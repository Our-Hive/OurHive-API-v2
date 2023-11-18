import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DailyRecordService } from '../services/daily-record.service';
import { CreateDailyRecordDto } from '../dtos/createDaily.dto';

@Controller('emotional-record')
export class DailyRecordController {
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
  @Delete('daily/:id')
  deleteDailyRecord(@Param('id') id: number) {
    return this.dailyService.deleteDailyRecord(id);
  }
}
