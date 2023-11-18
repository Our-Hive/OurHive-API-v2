import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateDailyRecord {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'happy',
    required: true,
    description: 'Daily user emotion',
  })
  emotion: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'My first daily record',
    required: true,
    description: 'Daily record title',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'Today I feel happy because I passed my exam',
    required: true,
    description: 'Daily record description',
  })
  description: string;
}
