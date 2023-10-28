import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';

export class OnboardingResponseDto {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.USER,
    example: 'user',
    required: false,
    description: 'User role',
  })
  role?: string;

  @ApiProperty({
    example: 'username',
    required: true,
    description: 'User username',
  })
  username: string;

  @ApiProperty({
    example: 'password',
    required: true,
    description: 'User password',
  })
  email: string;
}
