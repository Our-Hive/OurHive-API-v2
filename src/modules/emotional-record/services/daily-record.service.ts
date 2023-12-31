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
    const records = await this.dailyRepository.find();

    return records.map((record) => {
      return {
        ...record,
        type: 'DailyRecord', // Add the type property to each object
      };
    });
  }

  async getAllDailyRecordsByUser(userId: number) {
    const records = await this.dailyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return records.map((record) => {
      return {
        ...record,
        type: 'DailyRecord', // Add the type property to each object
      };
    });
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

  async getDailyRecordByUser(id: number, userId: number): Promise<DailyRecord> {
    const record = await this.dailyRepository.findOne({
      where: {
        id: id,
        user: {
          id: userId,
        },
      },
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  async createDailyRecord(
    record: CreateDailyRecordDto,
    loggedUserId: number,
  ): Promise<DailyRecord> {
    try {
      const recordWithUser = { ...record, user: { id: loggedUserId } };
      const newdaily = await this.dailyRepository.save(recordWithUser);

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
    loggedUserId: number,
  ) {
    const record = await this.getDailyRecordByUser(id, loggedUserId);

    const updatedRecord = Object.assign(record, updateRecord);

    const savedRecord = await this.dailyRepository.save(updatedRecord);

    if (!savedRecord) {
      throw new InternalServerErrorException('Error updating record');
    }

    return savedRecord;
  }

  async deleteDailyRecord(id: number, loggedUserId: number): Promise<boolean> {
    await this.getDailyRecordByUser(id, loggedUserId); // throws error if not found
    const result = await this.dailyRepository.delete(id);
    return result.affected > 0;
  }
}
