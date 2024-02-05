import { Customer } from '../customer/entities/customer.entity';
import * as Faker from 'faker';

export const seedCustomerData = async (amount: number): Promise<Customer[]> => {
  const customers: Customer[] = [];

  for (let i = 0; i < amount; i++) {
    const customer = new Customer();
    customer.name = Faker.name.firstName(); // Use Faker.name.firstName() for random names
    customer.email = Faker.internet.email(); // Use Faker.internet.email() for random email addresses
    customers.push(customer);
  }

  return customers;
};
