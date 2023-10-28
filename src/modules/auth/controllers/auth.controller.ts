import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OnboardingRequestDto } from '../dtos/onboarding.request.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginRequestDto } from '../dtos/login.request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: OnboardingRequestDto })
  @Post('onboarding')
  async onboarding(@Body() onboardingDto: OnboardingRequestDto) {
    return await this.authService.onboarding(onboardingDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as LoginRequestDto);
  }
}
