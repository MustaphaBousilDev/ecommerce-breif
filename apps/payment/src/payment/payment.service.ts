import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import * as paypal from 'paypal-rest-sdk';

 
@Injectable()
export class PaymentService {
    //  private stripe: Stripe;

  constructor() {
    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    //   apiVersion: '2023-10-16', // Updated API version
    // });

       // Configure your PayPal SDK
       paypal.configure({
        'mode': 'sandbox', // Sandbox or live
        'client_id': 'AZXr8N4MFE9VIf-4Nrprid_Y_HonyOTOZacKxRQisTIyBF-TRzGoiltXqKdAJWfO3QmeTFqCvqTqyu06',
        'client_secret': 'ELevPZ3L1XBpLjmcrs48-bVZrMBQ7n3mB1EKqbIhfzRq1qhpOhJFIJlYzIwScaC3aeGYx3UpUvayuKZt'
      });
  }
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }



//  async  paymentMethod() {
//   const paymentMethod = await this.stripe.paymentMethods.create({
//     type: 'card',
//     card: {
//       number: '4242424242424242',
//       exp_month: 8,
//       exp_year: 2026,
//       cvc: '314',
//     },
//   });
//   }





async createPayment(create_payment_json): Promise<any> {
  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
}
}






 
  










 

