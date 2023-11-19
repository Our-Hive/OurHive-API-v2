import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserControllerTsController } from './controllers/user.controller';

@Module({
  providers: [UserService],
  // TypOrmModule.forFeature([User]) will inject the User repository into the UserService.
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerTsController],
})
export class UserModule {}
