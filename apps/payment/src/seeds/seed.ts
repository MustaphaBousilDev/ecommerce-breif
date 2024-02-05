// src/seeds/seed.ts
import { AppDataSource } from './data-source';
 import { seedProductData } from './product.seed';
import { seedCartData } from './cart.seed';
import { seedOrderData } from './order.seed';
import { seedCustomerData } from './customer.seed';
import { seedPaymentData } from './payment.seed';




export async function runSeeders() {
  try {
    await AppDataSource.initialize();

      //  const products = await seedProductData(10);
      // const carts = await seedCartData(10);
    //  const orders = await seedOrderData(1);
      // const customers = await seedCustomerData(10);
    // const payments = await seedPaymentData(1);

    //   await AppDataSource.manager.save(products);
    //  await AppDataSource.manager.save(carts);
    //  await AppDataSource.manager.save(orders);
      // await AppDataSource.manager.save(customers);
    // await AppDataSource.manager.save(payments);

    await AppDataSource.destroy();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}


runSeeders().then(() => console.log('Seeding complete!')).catch(error => console.error('Seeding failed:', error));
