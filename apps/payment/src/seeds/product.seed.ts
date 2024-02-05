// src/seeds/product.seed.ts
import { Product } from '../product/entities/product.entity';
import * as Faker from 'faker';


export const seedProductData = async (amount: number): Promise<Product[]> => {
  const products: Product[] = [];

  for (let i = 0; i < amount; i++) {
    const product = new Product();
    product.name = Faker.commerce.productName();
    product.description = Faker.commerce.productDescription();
    product.price = parseFloat(Faker.commerce.price());
    products.push(product);
  }

  return products;
};
