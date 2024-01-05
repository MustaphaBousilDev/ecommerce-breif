import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    return createdOrder.save();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orderModel.findById(orderId).exec();
  }

  async updateOrder(orderId: string, updateData: Partial<Order>): Promise<Order | null> {
    return this.orderModel.findByIdAndUpdate(orderId, updateData, { new: true }).exec();
  }

  async deleteOrder(orderId: string): Promise<Order | null> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(orderId).exec();
    return deletedOrder ? (deletedOrder as unknown as Order) : null;
  }
  
  
  
}
