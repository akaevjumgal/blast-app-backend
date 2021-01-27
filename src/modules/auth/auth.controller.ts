import { Body, Controller, HttpStatus, Post, Response, UseGuards } from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../../models/user.model'
import {AuthGuard} from '@nestjs/passport'
import { LoginUserDto } from '../../models/auth.model'

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('register')
  public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto)

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result)
    }

    return res.status(HttpStatus.OK).json(result)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Response() res, @Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email)

    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found'
      })
    } else {
      const token = this.authService.createToken(user)
      res.status(HttpStatus.OK).json(token)
    }
  }
}
