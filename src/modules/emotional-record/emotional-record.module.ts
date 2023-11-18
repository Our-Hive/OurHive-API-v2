import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/daily-record.service';
import { EmotionalRecordController } from './controllers/emotional-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRecord } from './entities/daily-record.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord])], // 👈 para que funcione los repositorios
  providers: [DailyRecordService],
  controllers: [EmotionalRecordController],
})
export class EmotionalRecordModule {}
