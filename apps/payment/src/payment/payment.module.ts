import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeService } from '../stripe/stripe.service';

@Module({
  controllers: [PaymentController],
  // providers: [PaymentService,StripeService],
  providers: [PaymentService],
})
export class PaymentModule {}
