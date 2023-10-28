import { Module } from '@nestjs/common';
import { UserService } from './services/services.service';

@Module({
  providers: [UserService]
})
export class UserModule {}
