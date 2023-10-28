import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';
import configuration from 'src/configs/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(configuration.KEY) configService: ConfigType<typeof configuration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
