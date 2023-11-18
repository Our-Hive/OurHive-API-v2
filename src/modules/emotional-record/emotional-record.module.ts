import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/daily-record.service';
import { EmotionalRecordController } from './controllers/emotional-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRecord } from './entities/daily-record.entity';
import { TranscendentalRecordService } from './services/transcendental-record.service';
import { TranscendentalRecord } from './entities/transcendental-record.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord, TranscendentalRecord])], // 👈 para que funcione los repositorios
  providers: [DailyRecordService, TranscendentalRecordService],
  controllers: [EmotionalRecordController],
})
export class EmotionalRecordModule {}
