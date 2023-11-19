import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TranscendentalRecord } from 'src/modules/emotional-record/entities/transcendental-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTranscendentalRecordDto } from '../dtos/createTranscendental.request.dto';
import { UpdateTranscendentalRecordDto } from '../dtos/updateTrascendental.request.dto';

@Injectable()
export class TranscendentalRecordService {
  constructor(
    @InjectRepository(TranscendentalRecord)
    private readonly trascententalRepository: Repository<TranscendentalRecord>,
  ) {}

  async createTranscendentalRecord(record: CreateTranscendentalRecordDto) {
    const newRecord = await this.trascententalRepository.save(record);
    if (!newRecord) {
      throw new InternalServerErrorException('Error creating record');
    }
    return newRecord;
  }

  async getAllTranscendentalRecords(): Promise<TranscendentalRecord[]> {
    const records = await this.trascententalRepository.find();
    return records.map((record) => {
      return {
        ...record,
        type: 'TranscendentalRecord', // Add the type property to each object
      };
    });
  }

  async getAllTranscendentalRecordsByUser(userId: number) {
    const records = await this.trascententalRepository.find({
      where: { user_id: userId },
    });

    return records.map((record) => {
      return {
        ...record,
        type: 'TranscendentalRecord', // Add the type property to each object
      };
    });
  }

  async getTranscendentalRecord(recordId: number) {
    const record = await this.trascententalRepository.findOne({
      where: { id: recordId },
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return record;
  }

  async updateTranscendentalRecord(
    recordId: number,
    updateData: Partial<UpdateTranscendentalRecordDto>,
  ) {
    const record = await this.getTranscendentalRecord(recordId);
    const updatedRecord = Object.assign(record, updateData);
    const savedRecord = await this.trascententalRepository.save(updatedRecord);

    if (!savedRecord) {
      throw new InternalServerErrorException('Error updating record');
    }

    return savedRecord;
  }

  async deleteTranscendentalRecord(recordId: number) {
    await this.getTranscendentalRecord(recordId);

    const result = await this.trascententalRepository.delete(recordId);
    return result.affected > 0;
  }
}
