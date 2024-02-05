// src/seeds/cart.seed.ts
import { Cart } from '../cart/entities/cart.entity';
import * as Faker from 'faker';

export const seedCartData = async (amount: number): Promise<Cart[]> => {
  const carts: Cart[] = [];

  for (let i = 0; i < amount; i++) {
    const cart = new Cart();

    cart.productId = Faker.datatype.number({ min: 1, max: 10 }); 
    cart.quantity = Faker.datatype.number({ min: 1, max: 10 });
    cart.price = parseFloat(Faker.commerce.price());
    cart.createdAt = new Date(); // Set to the current date-time
    carts.push(cart);
  }

  return carts;
};
