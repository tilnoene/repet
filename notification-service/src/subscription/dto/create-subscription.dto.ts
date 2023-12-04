export class CreateSubscriptionDto {
  endpoint: string;
  expirationTime?: string;
  p256dh: string;
  auth: string;
  user_id: number;
}
