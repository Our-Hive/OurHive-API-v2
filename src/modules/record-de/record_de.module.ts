import { Module } from '@nestjs/common';
import { RecordDeService } from './services/record-de.service';
import { RecordDeController } from './controllers/record-de.controller';

@Module({
  providers: [RecordDeService],
  controllers: [RecordDeController],
})
export class RecordDeModule {}
