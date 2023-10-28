import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OnboardingDto } from '../dtos/onboarding.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: OnboardingDto })
  @Post('onboarding')
  onboarding(@Body() onboardingDto: OnboardingDto) {
    return this.authService.onboarding(onboardingDto);
  }

  @Post('login')
  login() {
    return 'login';
  }
}
