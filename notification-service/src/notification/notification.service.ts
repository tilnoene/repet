import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

import { PrismaService } from '../prisma/prisma.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import * as webpush from 'web-push';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

@Injectable()
export class NotificationService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private prisma: PrismaService,
  ) {
    dayjs.extend(customParseFormat);
  }

  addCronJob(
    name: string,
    cronExpression: string,
    callback: () => Promise<void>,
  ) {
    const job = new CronJob(`${cronExpression}`, () => {
      callback();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  sendNotification(subscription, dataToSend = '') {
    webpush.sendNotification(subscription, dataToSend);
  }

  create(createNotificationDto: CreateNotificationDto) {
    webpush.setVapidDetails(
      `mailto:${process.env.EMAIL}`,
      process.env.PUBLIC_KEY,
      process.env.PRIVATE_KEY,
    );

    const date = dayjs(createNotificationDto.date, 'YYYY-MM-DD');
    const time = dayjs(createNotificationDto.time, 'HH:mm:ss');

    const myCron = createNotificationDto.time
      ? `${time.minute()} ${time.hour()} ${date.date()} ${date.month() + 1} *`
      : `0 0 ${date.date()} ${date.month() + 1} *`;

    console.log(`Adicionando notificação no cron ${myCron}`);

    this.addCronJob(
      `${createNotificationDto.user_id}-${myCron}`,
      myCron,
      async () => {
        try {
          const subscriptions = await this.prisma.subscription.findMany({
            where: {
              user_id: createNotificationDto.user_id,
            },
          });

          subscriptions.forEach((subscription) => {
            this.sendNotification(
              {
                endpoint: subscription.endpoint,
                expirationTime: null,
                keys: {
                  p256dh: subscription.p256dh,
                  auth: subscription.auth,
                },
              },
              createNotificationDto.message,
            );
          });
        } catch {
          throw new ForbiddenException("Can't get messages");
        }
      },
    );

    return 'This action adds a new notification';
  }
}
