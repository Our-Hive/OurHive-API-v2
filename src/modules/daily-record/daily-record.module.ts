import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/daily-record.service';
import { DailyRecordController } from './controllers/daily-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRecord } from './entities/daily-record.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord])], // 👈 para que funcione los repositorios
  providers: [DailyRecordService],
  controllers: [DailyRecordController],
})
export class DailyRecordModule {}
