import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDailyRecordDto {
  @ApiProperty({
    example: 'happy',
    required: true,
    description: 'Daily user emotion',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  emotion: string;

  @ApiProperty({
    example: 'My first daily record',
    required: true,
    description: 'Daily record title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Today I feel happy because I passed my exam',
    required: true,
    description: 'Daily record description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: 'User id',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;
}
