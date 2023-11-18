import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyRecordDto } from '../dtos/createDaily.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyRecord } from '../entities/daily-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DailyRecordService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRepository: Repository<DailyRecord>,
  ) {}

  async createDailyRecord(record: CreateDailyRecordDto): Promise<DailyRecord> {
    return await this.dailyRepository.save(record);
  }

  async getAllDailyRecords(): Promise<DailyRecord[]> {
    return await this.dailyRepository.find();
  }
  async getDailyRecord(id: number): Promise<DailyRecord> {
    const record = await this.dailyRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(record);
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }
  updateDailyRecord() {}
  async deleteDailyRecord(id: number): Promise<any> {
    return await this.dailyRepository.delete(id);
  }
}
