import { Order } from '../order/entities/order.entity';
import * as Faker from 'faker';

export const seedOrderData = async (amount: number): Promise<Order[]> => {
  const orders: Order[] = [];

  for (let i = 0; i < amount; i++) {
    const order = new Order();
    order.customerId = Faker.datatype.number({ min:1, max:6 });
    order.cartId = Faker.datatype.number({ min: 2 ,max:10});
    order.total = Faker.datatype.float({ min: 0, max: 1000, precision: 0.01 });
    order.status = ['pending', 'completed', 'cancelled'][Faker.datatype.number({ min: 0, max: 2 })]; // Example statuses
    order.createdAt = new Date();
    orders.push(order);
  }

  return orders;
};
