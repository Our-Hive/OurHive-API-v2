import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async updateDailyRecord(
    id: number,
    updateRecord: Partial<UpdateDailyRecord>,
  ) {
    const record = await this.getDailyRecord(id);

    const updatedRecord = Object.assign(record, updateRecord);

    const savedRecord = await this.dailyRepository.save(updatedRecord);

    if (!savedRecord) {
      throw new InternalServerErrorException('Error updating record');
    }

    return savedRecord;
  }

  async deleteDailyRecord(id: number): Promise<boolean> {
    await this.getDailyRecord(id); // throws error if not found
    const result = await this.dailyRepository.delete(id);
    return result.affected > 0;
  }
}
