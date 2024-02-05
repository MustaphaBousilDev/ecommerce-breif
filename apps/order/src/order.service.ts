import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { User } from './user/user.model'; // Import the User model
import { Product } from './products/product.model'; // Import the Product model

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(User.name) private readonly userModel: Model<User>, // Inject the User model
    @InjectModel(Product.name) private readonly productModel: Model<Product>, // Inject the Product model
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    return createdOrder.save();
  }

  async getAllOrders(): Promise<Order[]> {
    // Use populate to replace userId and productId with actual user and product data
    return this.orderModel.find().populate('userId').populate('productId').exec();
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    // Use populate to replace userId and productId with actual user and product data
    return this.orderModel.findById(orderId).populate('userId').populate('productId').exec();
  }

  async updateOrder(orderId: string, updateData: Partial<Order>): Promise<Order | null> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderId, updateData, { new: true })
      .populate('userId')
      .populate('productId')
      .exec();

    return updatedOrder;
  }

  async deleteOrder(orderId: string): Promise<Order | null> {
    // Use populate to replace userId and productId with actual user and product data
    const deletedOrder = await this.orderModel
      .findByIdAndDelete(orderId)
      .populate('userId')
      .populate('productId')
      .exec();

    return deletedOrder ? (deletedOrder as unknown as Order) : null;
  }

  async getOrderByNameAndUser(productName: string, userId: string): Promise<Order | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      return null;
    }

    const product = await this.productModel.findOne({ productName }).exec();
    if (!product) {
      return null;
    }

    // Use populate to replace userId and productId with actual user and product data
    return this.orderModel.findOne({ productName, userId }).populate('userId').populate('productId').exec();
  }

  // Additional methods can be added as needed for your use case
}
