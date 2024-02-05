 import { Module } from '@nestjs/common';
 import { AppController } from './app.controller';
 import { AppService } from './app.service';
  import { PaymentModule } from './payment/payment.module';
 import { StripeModule } from './stripe/stripe.module';
 import { ConfigModule } from '@nestjs/config';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { CustomerModule } from './customer/customer.module';
 import { ProductModule } from './product/product.module';
 import { OrderModule } from './order/order.module';
 import { CartModule } from './cart/cart.module';
import { Customer } from './customer/entities/customer.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';
import { Payment } from './payment/entities/payment.entity';








import { CommandModule } from 'nestjs-command';
import { SeedCommand } from './commands/seed.command';




@Module({
  imports: [ CommandModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
    ,PaymentModule,StripeModule,TypeOrmModule.forRoot({
      // ,StripeModule,TypeOrmModule.forRoot({

      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecom',
      entities: [Product,Customer,Order,Cart,Payment],
      synchronize: true,
    }),
    CustomerModule,
     ProductModule,
    OrderModule,
    CartModule,
     PaymentModule,
     ],
    
  controllers: [AppController],
  providers: [SeedCommand,AppService],
})
export class AppModule {}





