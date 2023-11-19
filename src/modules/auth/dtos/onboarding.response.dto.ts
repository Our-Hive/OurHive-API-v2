import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';

export class OnboardingResponseDto {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.USER,
    example: 'user',
    description: 'User role',
  })
  role?: string;

  @ApiProperty({
    example: 'username',
    description: 'User username',
  })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  email: string;

  @ApiProperty({
    example: 'token',
    description: 'The access token',
  })
  access_token: string;
}
