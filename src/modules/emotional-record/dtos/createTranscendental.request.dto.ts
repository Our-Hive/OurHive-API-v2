import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTranscendentalRecordDto {
  @ApiProperty({
    example: 'Happy',
    description: 'The emotion associated with the record',
  })
  @IsNotEmpty()
  @IsString()
  emotion: string;

  @ApiProperty({ example: 'Title', description: 'The title of the record' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title: string;

  @ApiProperty({
    example: 'Description',
    description: 'The description of the record',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: 'Location',
    description: 'The location of the record',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  location: string;

  @ApiProperty({
    example: 'Activity',
    description: 'The activity associated with the record',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  activity: string;

  @ApiProperty({
    example: 'Companion',
    description: 'The companion of the record',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  companion: string;
}
