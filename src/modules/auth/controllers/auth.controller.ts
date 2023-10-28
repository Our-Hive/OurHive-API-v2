import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OnboardingRequestDto } from '../dtos/onboarding.request.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: OnboardingRequestDto })
  @Post('onboarding')
  async onboarding(@Body() onboardingDto: OnboardingRequestDto) {
    return await this.authService.onboarding(onboardingDto);
  }

  @Post('login')
  login() {
    return 'login';
  }
}
