import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Id of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    enum: UserRole,
    example: 'user',
    description: 'User role',
  })
  role: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user', example: 'password123' })
  @MinLength(8)
  password: string;
}
