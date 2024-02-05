// src/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Order } from '../order/entities/order.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Payment } from '../payment/entities/payment.entity';

// Import other entities

export const AppDataSource = new DataSource({
    type: "mysql", // or your database type
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ecom",
    entities: [Product,Cart,Order,Customer,Payment /*, other entities */],
    synchronize: true, // Be careful with this in production!
    // ...other options
});
