import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, Column,JoinColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @Column()
  cartId: number;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @Column('float')
  total: number;

  @OneToOne(() => Payment, payment => payment.order)
  payment: Payment;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}