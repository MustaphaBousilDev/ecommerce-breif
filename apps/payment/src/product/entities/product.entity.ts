import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @OneToMany(() => Cart, cart => cart.product)
  carts: Cart[];
}