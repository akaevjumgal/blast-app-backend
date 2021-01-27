import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ExtractJwt } from 'passport-jwt'
import { JwtPayload } from '../../models/auth.model'

@Injectable()
export class JwnStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY
    })
  }

  async validate(
    payload: JwtPayload,
    done: (exception: HttpException | null, valid: boolean) => void
  ) {
    const user = await this.authService.validateUserToken(payload)

    if (!user) {
      return done(new UnauthorizedException(), false)
    }

    return done(null, true)
  }
}
