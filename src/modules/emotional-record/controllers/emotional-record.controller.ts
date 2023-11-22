import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DailyRecordService } from '../services/daily-record.service';
import { CreateDailyRecordDto } from '../dtos/createDaily.dto';
import { UpdateDailyRecord } from '../dtos/updateDaily.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TranscendentalRecordService } from '../services/transcendental-record.service';
import { CreateTranscendentalRecordDto } from '../dtos/createTranscendental.request.dto';
import { UpdateTranscendentalRecordDto } from '../dtos/updateTrascendental.request.dto';
import { RecordService } from '../services/record.service';
import { Request } from 'express';
import { PayloadTokenDto } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Emotional Record')
@ApiBearerAuth()
@Controller('emotional-record')
export class EmotionalRecordController {
  constructor(
    private readonly recordService: RecordService,
    private readonly dailyService: DailyRecordService,
    private readonly transcendentalService: TranscendentalRecordService,
  ) {}

  @ApiOperation({ summary: 'Get all records' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Get()
  getAllRecords(@Req() req: Request) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.recordService.getAllRecordsByUser(loggedUser.sub);
  }

  @ApiOperation({ summary: 'Get all daily records' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Get('daily')
  getDailies(@Req() req: Request) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.dailyService.getAllDailyRecordsByUser(loggedUser.sub);
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
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  newDailyRecord(@Req() req: Request, @Body() newDaily: CreateDailyRecordDto) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.dailyService.createDailyRecord(newDaily, loggedUser.sub);
  }

  @ApiOperation({ summary: 'Update a daily record by ID' })
  @Patch('daily/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @ApiBody({ type: UpdateDailyRecord })
  updateDailyRecord(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateDaily: Partial<UpdateDailyRecord>,
  ) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.dailyService.updateDailyRecord(id, updateDaily, loggedUser.sub);
  }

  @ApiOperation({ summary: 'Delete a daily record by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Delete('daily/:id')
  deleteDailyRecord(@Req() req: Request, @Param('id') id: number) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.dailyService.deleteDailyRecord(id, loggedUser.sub);
  }

  @ApiOperation({ summary: 'Get all transcendental records' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Get('transcendental')
  getTranscendentals(@Req() req: Request) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.transcendentalService.getAllTranscendentalRecordsByUser(
      loggedUser.sub,
    );
  }

  @ApiOperation({ summary: 'Get a transcendental record by ID' })
  @Get('transcendental/:id')
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @ApiParam({ name: 'id', type: 'number' })
  getTranscendental(@Param('id') id: number) {
    return this.transcendentalService.getTranscendentalRecord(id);
  }

  @ApiOperation({ summary: 'Create a new transcendental record' })
  @Post('transcendental')
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @ApiBody({ type: CreateTranscendentalRecordDto })
  newTranscendentalRecord(
    @Req() req: Request,
    @Body() newTranscendental: CreateTranscendentalRecordDto,
  ) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.transcendentalService.createTranscendentalRecord(
      newTranscendental,
      loggedUser.sub,
    );
  }

  @ApiOperation({ summary: 'Update a transcendental record by ID' })
  @Patch('transcendental/:id')
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateTranscendentalRecordDto })
  updateTranscendentalRecord(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateTranscendental: Partial<UpdateTranscendentalRecordDto>,
  ) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.transcendentalService.updateTranscendentalRecord(
      id,
      updateTranscendental,
      loggedUser.sub,
    );
  }

  @ApiOperation({ summary: 'Delete a transcendental record by ID' })
  @Delete('transcendental/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  deleteTranscendentalRecord(@Req() req: Request, @Param('id') id: number) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.transcendentalService.deleteTranscendentalRecord(
      id,
      loggedUser.sub,
    );
  }
}
