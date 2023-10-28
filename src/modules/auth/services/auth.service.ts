import { Injectable } from '@nestjs/common';
import { OnboardingDto } from '../dtos/onboarding.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async onboarding(onboardingDto: OnboardingDto) {
    return onboardingDto;
  }

  async login() {
    return 'login';
  }
}
