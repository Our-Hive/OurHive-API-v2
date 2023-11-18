import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TranscendentalRecord } from 'src/modules/emotional-record/entities/transcendental-record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TranscendentalRecordService {
  constructor(
    @InjectRepository(TranscendentalRecord)
    private readonly trascententalRepository: Repository<TranscendentalRecord>,
  ) {}
}
