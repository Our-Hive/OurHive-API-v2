import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';

export class OnboardingRequestDto {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.USER,
    example: 'user',
    required: false,
    description: 'User role',
  })
  @IsEnum(UserRole)
  role?: string;

  @ApiProperty({
    example: 'username',
    required: true,
    description: 'User username',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'password',
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
