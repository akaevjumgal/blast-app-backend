import * as jwt from 'jsonwebtoken'
import { Injectable, Logger } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../../models/user.model'
import { JwtPayload, RegistrationStatus } from '../../models/auth.model'
import { UserEntity } from '../../entites/user.entity'
import { debug } from 'console'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name)

  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) { }

  async register(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register'
    }

    try {
      await this.usersService.register(user)
    } catch (err) {
      debug(err)
      status = { success: false, message: err }
    }

    return status
  }

  createToken(user: UserEntity) {
    const expiresIn = process.env.JWT_TOKEN_EXPIRATION
    debug(this.configService.get('JWT_SECRET_KEY'))
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn }
    )

    return {
      expiresIn,
      accessToken
    }
  }

  async validateUserToken(payload: JwtPayload) {
    return this.usersService.findById(payload.id)
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (user && user.comparePassword(password)) {
      this.logger.log('password check success')
      const {password, ...result} = user

      return result
    }

    return null
  }

}
