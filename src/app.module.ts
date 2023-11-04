import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './configs/dbConfig';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { RecordDeModule } from './modules/record_de/record_de.module';
import { RecordDeService } from './services/record-de.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV || '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    AuthModule,
    UserModule,
    RecordDeModule,
  ],
  controllers: [AppController],
  providers: [RecordDeService],
})
export class AppModule {}
