import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'User',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'thisIsMyPassword',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'example@outlook.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
