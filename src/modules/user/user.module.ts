import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UserService],
  // TypOrmModule.forFeature([User]) will inject the User repository into the UserService.
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
