
import { StripeService } from '../stripe/stripe.service';
import { Controller, Body, Get, Post, Redirect, Req, Res } from '@nestjs/common';
import { Render } from '@nestjs/common/decorators/http/render.decorator';
import { Request, Response } from 'express';
import * as paypal from 'paypal-rest-sdk';

@Controller('payment')
export class PaymentController {
  // constructor(private readonly stripeService: StripeService) {}

  // @Post('intent')
  // async createPaymentIntent(@Body() paymentData: { amount: number; currency: string; paymentMethodId: string }) {
  //   return this.stripeService.createPaymentIntent(paymentData.amount, paymentData.currency, paymentData.paymentMethodId);
  // }

  // @Post('create-test-payment-method')
  // async createTestPaymentMethod(@Body() cardData: { number: string; exp_month: number; exp_year: number; cvc: string }) {
  //   return this.stripeService.createTestPaymentMethod(cardData);
  // }

  @Post('pay')
  // @Redirect()
  pay(@Res() res: Response) {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/payment/success",
          "cancel_url": "http://localhost:3000/payment/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "25.00"
          },
          "description": "Hat for the best team ever"
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              console.log('yesssssss')
              console.log(payment.links[i].href);
              const approvalUrl = payment.links.find(link => link.rel === 'approval_url')?.href;
              res.json({ approvalUrl });
              return ; 

            }
          }
      }
    });
  }

  @Get('success')
  success(@Req() req: Request, @Res() res: Response) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
    });
  }

  @Get('cancel')
  cancel(@Res() res: Response) {
    res.send('Cancelled');
  }
}