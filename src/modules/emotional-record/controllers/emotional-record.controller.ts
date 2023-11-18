import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DailyRecordService } from '../services/daily-record.service';
import { CreateDailyRecordDto } from '../dtos/createDaily.dto';
import { UpdateDailyRecord } from '../dtos/updateDaily.dto';

@Controller('emotional-record')
export class EmotionalRecordController {
  constructor(private readonly dailyService: DailyRecordService) {}
  @Get('daily')
  getDailies() {
    return this.dailyService.getAllDailyRecords();
  }

  @Get('daily/:id')
  getDaily(@Param('id') id: number) {
    return this.dailyService.getDailyRecord(id);
  }

  @Post('daily')
  newDailyRecord(@Body() newDaily: CreateDailyRecordDto) {
    return this.dailyService.createDailyRecord(newDaily);
  }

  @Patch('daily/:id')
  updateDailyRecord(
    @Param('id') id: number,
    @Body() updateDaily: Partial<UpdateDailyRecord>,
  ) {
    return this.dailyService.updateDailyRecord(id, updateDaily);
  }

  @Delete('daily/:id')
  deleteDailyRecord(@Param('id') id: number) {
    return this.dailyService.deleteDailyRecord(id);
  }

  @Get('transcendental')
  getTranscendentals() {
    return 'Transcendentals';
  }
}
