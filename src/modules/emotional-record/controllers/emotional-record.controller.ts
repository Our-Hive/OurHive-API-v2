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
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Emotional Record')
@Controller('emotional-record')
export class EmotionalRecordController {
  constructor(private readonly dailyService: DailyRecordService) {}

  @ApiOperation({ summary: 'Get all daily records' })
  @Get('daily')
  getDailies() {
    return this.dailyService.getAllDailyRecords();
  }

  @ApiOperation({ summary: 'Get a daily record by ID' })
  @Get('daily/:id')
  @ApiParam({ name: 'id', type: 'number' })
  getDaily(@Param('id') id: number) {
    return this.dailyService.getDailyRecord(id);
  }

  @ApiOperation({ summary: 'Create a new daily record' })
  @Post('daily')
  @ApiBody({ type: CreateDailyRecordDto })
  newDailyRecord(@Body() newDaily: CreateDailyRecordDto) {
    return this.dailyService.createDailyRecord(newDaily);
  }

  @ApiOperation({ summary: 'Update a daily record by ID' })
  @Patch('daily/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateDailyRecord })
  updateDailyRecord(
    @Param('id') id: number,
    @Body() updateDaily: Partial<UpdateDailyRecord>,
  ) {
    return this.dailyService.updateDailyRecord(id, updateDaily);
  }

  @ApiOperation({ summary: 'Delete a daily record by ID' })
  @Delete('daily/:id')
  @ApiParam({ name: 'id', type: 'number' })
  deleteDailyRecord(@Param('id') id: number) {
    return this.dailyService.deleteDailyRecord(id);
  }
}
