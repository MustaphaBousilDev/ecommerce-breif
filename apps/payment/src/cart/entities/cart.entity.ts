import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, product => product.carts)
  product: Product;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Order, order => order.cart)
  orders: Order[];
}