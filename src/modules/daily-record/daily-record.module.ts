import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/daily-record.service';
import { DailyRecordController } from './controllers/daily-record.controller';

@Module({
  providers: [DailyRecordService],
  controllers: [DailyRecordController],
})
export class DailyRecordModule {}
