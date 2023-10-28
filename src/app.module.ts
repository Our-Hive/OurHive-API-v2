import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './configs/dbConfig';

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseConfig()), AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
