import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyRecordDto } from '../dtos/createDaily.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyRecord } from '../entities/daily-record.entity';
import { Repository } from 'typeorm';
import { UpdateDailyRecord } from '../dtos/updateDaily.dto';

@Injectable()
export class DailyRecordService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRepository: Repository<DailyRecord>,
  ) {}

  async getAllDailyRecords(): Promise<DailyRecord[]> {
    return await this.dailyRepository.find();
  }

  async getDailyRecord(id: number): Promise<DailyRecord> {
    const record = await this.dailyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  async createDailyRecord(record: CreateDailyRecordDto): Promise<DailyRecord> {
    try {
      const newdaily = await this.dailyRepository.save(record);

      if (!newdaily) {
        throw new NotFoundException('Record not created');
      }
      return newdaily;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDailyRecord(id: number, updateRecord: UpdateDailyRecord) {
    const record = await this.getDailyRecord(id);
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    await this.dailyRepository.update(id, updateRecord);
    return await this.getDailyRecord(id);
  }

  async deleteDailyRecord(id: number): Promise<boolean> {
    const record = await this.getDailyRecord(id);
    const result = await this.dailyRepository.delete(id);
    console.log(result);
    console.log(record);
    return result.affected > 0;
  }
}
