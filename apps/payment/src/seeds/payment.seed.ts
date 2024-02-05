import { Payment } from '../payment/entities/payment.entity';
import * as Faker from 'faker';

export const seedPaymentData = async (amount: number): Promise<Payment[]> => {
  const payments: Payment[] = [];

  for (let i = 0; i < amount; i++) {
    const payment = new Payment();
    payment.orderId = Faker.datatype.number({ min: 30, max: 31 });
    payment.amount = Faker.datatype.number({ min: 50, max: 500 });
    payment.currency = 'USD'; // Assuming USD, replace with actual logic if needed
    payment.method = ['credit card', 'paypal', 'bank transfer'][Faker.datatype.number({ min: 0, max: 2 })]; // Example payment methods
    payment.status = ['pending', 'completed', 'cancelled'][Faker.datatype.number({ min: 0, max: 2 })]; // Example statuses
    payment.createdAt = new Date();

    payments.push(payment);
  }

  return payments;
};
