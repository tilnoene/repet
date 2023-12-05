import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      // save the new subscription in the db
      const subscription = await this.prisma.subscription.create({
        data: {
          endpoint: createSubscriptionDto.endpoint,
          user_id: createSubscriptionDto.user_id,
          p256dh: createSubscriptionDto.p256dh,
          auth: createSubscriptionDto.auth,
        },
      });

      return subscription;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
