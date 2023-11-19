import { Injectable } from '@nestjs/common';
import { TranscendentalRecordService } from './transcendental-record.service';
import { DailyRecordService } from './daily-record.service';
import { EmotionalRecord } from '../dtos/getRecord.response.dto';

@Injectable()
export class RecordService {
  constructor(
    private readonly transcedentalService: TranscendentalRecordService,
    private readonly dailyService: DailyRecordService,
  ) {}

  async getAllRecords(): Promise<EmotionalRecord[]> {
    const transcendentalRecords =
      await this.transcedentalService.getAllTranscendentalRecords();

    const dailyRecords = await this.dailyService.getAllDailyRecords();

    const records = this.sortRecords([
      ...transcendentalRecords,
      ...dailyRecords,
    ]);

    return records;
  }

  async getAllRecordsByUser(userId: number): Promise<EmotionalRecord[]> {
    const transcendentalRecords =
      await this.transcedentalService.getAllTranscendentalRecordsByUser(userId);

    const dailyRecords =
      await this.dailyService.getAllDailyRecordsByUser(userId);

    const records = this.sortRecords([
      ...transcendentalRecords,
      ...dailyRecords,
    ]);

    return records;
  }

  private sortRecords(records: EmotionalRecord[]): EmotionalRecord[] {
    return records.sort((record1, record2) => {
      return (
        new Date(record2.created_at).getTime() -
        new Date(record1.created_at).getTime()
      );
    });
  }
}
