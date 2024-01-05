import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model'; // Assuming User and its schema are defined in user.model

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Other modules if needed
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
