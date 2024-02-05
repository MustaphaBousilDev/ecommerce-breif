





import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import Stripe from 'stripe';
      
@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16', // Updated API version
    });
  }

  async createPaymentIntent(amount: number, currency: string, paymentMethodId: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment intent
      return_url : 'https://your-redirect-url.com'
    });
  }
  


    // Add this new method
    async createTestPaymentMethod(cardData: { number: string; exp_month: number; exp_year: number; cvc: string }) {
      return await this.stripe.paymentMethods.create({
        type: 'card',
        card: cardData,
      });
    }
  





    // async createCheckoutSession() {

    //   try {
    //     const session = await this.stripe.checkout.sessions.create({
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: 'usd',
    //             unit_amount: 2000,
    //             product_data: {
    //               name: 'T-shirt',
    //               description: 'Comfortable cotton t-shirt',
    //               images: ['https://inewgadgets.com/wp-content/uploads/2020/07/25.jpg'],
    //             },
    //           },
    //           quantity: 1,
    //         },
    //         {
    //           price_data: {
    //             currency: 'usd',
    //             unit_amount: 3000, // Adjust the price for the second product
    //             product_data: {
    //               name: 'Hoodie',
    //               description: 'Warm and stylish hoodie',
    //               images: ['https://www.pngall.com/wp-content/uploads/14/Hoodie-PNG-Pic.png'], // Replace with the actual image URL
    //             },
    //           },
    //           quantity: 1,
    //         },
    //         {
    //           price_data: {
    //             currency: 'usd',
    //             unit_amount: 3000, // Adjust the price for the second product
    //             product_data: {
    //               name: 'Cap',
    //               description: 'Warm and stylish cap',
    //               images: ['https://freepngimg.com/thumb/cap/32592-2-cap-picture.png'], // Replace with the actual image URL
    //             },
    //           },
    //           quantity: 1,
    //         },
    //       ],

    //       mode: 'payment',
    //       success_url: `http://localhost:5173/checkout-success`, // replace with your actual domain
    //       cancel_url: `http://localhost:5173/?cancel=true`, // replace with your actual domain
    //     });
             
    //     return session;
        
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }







      async createCheckoutSession(cartItems: any[]) {

      try {
        const session = await this.stripe.checkout.sessions.create({
          line_items: cartItems.map(item => ({
            price_data: {
              currency: 'usd',
              unit_amount:3000, // Adjust as needed
              product_data: {
                name: item.name,
                description: item.description,
                images: [item.image], // Replace with the actual image URL
              },
            },
            quantity: item.quantity,
          }))           
          ,
          mode: 'payment',
          success_url: `http://localhost:5173/checkout-success`, // replace with your actual domain
          cancel_url: `http://localhost:5173/?cancel=true`, // replace with your actual domain
        });
             
        return session;
        
      } catch (error) {
        console.error(error);
        throw error;
      }
    }






}


