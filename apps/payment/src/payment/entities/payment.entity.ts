
import { Entity, Column, PrimaryGeneratedColumn, OneToOne,JoinColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn()
  order: Order;

  @Column('float')
  amount: number;

  @Column()
  currency: string;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}