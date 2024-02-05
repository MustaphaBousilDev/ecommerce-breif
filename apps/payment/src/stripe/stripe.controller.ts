import { Controller, Post, Body,Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './Cart.model';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {

     constructor(private stripeService: StripeService){}

   @Post('intent')
     async createPaymentIntent(@Body() paymentData: { amount: number; currency: string; paymentMethodId: string }) {
     return this.stripeService.createPaymentIntent(paymentData.amount, paymentData.currency, paymentData.paymentMethodId);
   }


   @Post('create-checkout-session')
   async createCheckoutSession(@Body() body: { cartItems: any[] } ,@Res() res: Response) {
    const cartItems = body.cartItems
    console.log(cartItems)
     try {
       const session = await this.stripeService.createCheckoutSession(body.cartItems);
 
       //res.redirect(303, session.url);
       

       res.send({url: session.url});
     } catch (error) {
       console.error(error);
       // Handle error and send an appropriate response
       res.status(500).json({ error: 'Internal Server Error' });
     }
   }






}
