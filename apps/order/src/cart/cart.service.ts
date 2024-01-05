
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {}

  async getUserCart(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId }).exec();
  }

  async addItemToCart(userId: string, item: any): Promise<Cart | null> {
    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [item] });
    } else {
      cart.items.push(item);
      await cart.save();
    }

    return cart;
  }

  async removeItemFromCart(userId: string, itemId: string): Promise<Cart | null> {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { $pull: { 'items._id': itemId } },
      { new: true }
    ).exec();
  }

  async updateCartItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart | null> {
    return this.cartModel.findOneAndUpdate(
      { userId, 'items._id': itemId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    ).exec();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    ).exec();
  }
}
