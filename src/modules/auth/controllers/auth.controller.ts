import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OnboardingDto } from '../dtos/onboarding.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @ApiBody({ type: OnboardingDto })
  @Post('onboarding')
  onboarding(@Body() onboardingDto: OnboardingDto) {
    return `onboarding ${onboardingDto.email} ${onboardingDto.password} ${onboardingDto.username}`;
  }

  @Post('login')
  login() {
    return 'login';
  }
}
