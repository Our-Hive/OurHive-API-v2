import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDailyRecordDto {
  @IsString()
  @IsNotEmpty()
  emotion: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  user_id: number;
}
