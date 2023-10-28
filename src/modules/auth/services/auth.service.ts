import { Injectable } from '@nestjs/common';
import { OnboardingRequestDto } from '../dtos/onboarding.request.dto';
import { hash } from 'bcrypt';
import { UserService } from 'src/modules/user/services/user.service';
import { OnboardingResponseDto } from '../dtos/onboarding.response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async onboarding(
    onboardingDto: OnboardingRequestDto,
  ): Promise<OnboardingResponseDto> {
    // Encrypt password
    const encryptedPassword = await hash(onboardingDto.password, 10);
    // Replace password with encrypted password
    onboardingDto.password = encryptedPassword;

    const createdUser = await this.userService.create(onboardingDto);

    return {
      role: createdUser.role,
      username: createdUser.username,
      email: createdUser.email,
    };
  }

  async login() {
    return 'login';
  }
}
