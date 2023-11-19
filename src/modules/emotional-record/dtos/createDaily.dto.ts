import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDailyRecordDto {
  @ApiProperty({
    example: 'Sad',
    required: true,
    description: 'Daily user emotion',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  primaryEmotion: string;

  @ApiProperty({
    example: 'Lonely',
    required: true,
    description: 'The second emotion associated with the record',
  })
  @IsNotEmpty()
  @IsString()
  secondaryEmotion: string;

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
}
