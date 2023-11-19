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
import { TranscendentalRecordService } from '../services/transcendental-record.service';
import { CreateTranscendentalRecordDto } from '../dtos/createTranscendental.request.dto';
import { UpdateTranscendentalRecordDto } from '../dtos/updateTrascendental.request.dto';
import { RecordService } from '../services/record.service';

@ApiTags('Emotional Record')
@Controller('emotional-record')
export class EmotionalRecordController {
  constructor(
    private readonly recordService: RecordService,
    private readonly dailyService: DailyRecordService,
    private readonly transcendentalService: TranscendentalRecordService,
  ) {}

  @ApiOperation({ summary: 'Get all records' })
  @Get()
  getAllRecords() {
    return this.recordService.getAllRecords();
  }

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

  @ApiOperation({ summary: 'Get all transcendental records' })
  @Get('transcendental')
  getTranscendentals() {
    return this.transcendentalService.getAllTranscendentalRecords();
  }

  @ApiOperation({ summary: 'Get a transcendental record by ID' })
  @Get('transcendental/:id')
  @ApiParam({ name: 'id', type: 'number' })
  getTranscendental(@Param('id') id: number) {
    return this.transcendentalService.getTranscendentalRecord(id);
  }

  @ApiOperation({ summary: 'Create a new transcendental record' })
  @Post('transcendental')
  @ApiBody({ type: CreateTranscendentalRecordDto })
  newTranscendentalRecord(
    @Body() newTranscendental: CreateTranscendentalRecordDto,
  ) {
    return this.transcendentalService.createTranscendentalRecord(
      newTranscendental,
    );
  }

  @ApiOperation({ summary: 'Update a transcendental record by ID' })
  @Patch('transcendental/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateTranscendentalRecordDto })
  updateTranscendentalRecord(
    @Param('id') id: number,
    @Body() updateTranscendental: Partial<UpdateTranscendentalRecordDto>,
  ) {
    return this.transcendentalService.updateTranscendentalRecord(
      id,
      updateTranscendental,
    );
  }

  @ApiOperation({ summary: 'Delete a transcendental record by ID' })
  @Delete('transcendental/:id')
  @ApiParam({ name: 'id', type: 'number' })
  deleteTranscendentalRecord(@Param('id') id: number) {
    return this.transcendentalService.deleteTranscendentalRecord(id);
  }
}
