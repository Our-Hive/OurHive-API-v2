import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/daily-record.service';
import { EmotionalRecordController } from './controllers/emotional-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRecord } from './entities/daily-record.entity';
import { TranscendentalRecordService } from './services/transcendental-record.service';
import { TranscendentalRecord } from './entities/transcendental-record.entity';
import { RecordService } from './services/record.service';
@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord, TranscendentalRecord])], // 👈 para que funcione los repositorios
  providers: [DailyRecordService, TranscendentalRecordService, RecordService],
  controllers: [EmotionalRecordController],
})
export class EmotionalRecordModule {}
