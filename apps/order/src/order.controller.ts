import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<Order | null> {
    return this.orderService.getOrderById(orderId);
  }

  @Patch(':id')
  async updateOrder(@Param('id') orderId: string, @Body() updateData: Partial<Order>): Promise<Order | null> {
    return this.orderService.updateOrder(orderId, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string): Promise<Order | null> {
    return this.orderService.deleteOrder(orderId);
  }
}
