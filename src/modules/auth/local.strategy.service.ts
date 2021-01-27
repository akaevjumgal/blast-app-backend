import { Strategy } from 'passport-local'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy)  {

  private readonly logger = new Logger(AuthService.name)

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password)
    this.logger.log(user)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
