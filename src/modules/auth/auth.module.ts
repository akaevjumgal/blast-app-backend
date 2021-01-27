import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategyService } from './local.strategy.service'
import { JwnStrategyService } from './jwn.strategy.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION}
    })
  ],
  providers: [AuthService, LocalStrategyService, JwnStrategyService],
  exports: [AuthService, LocalStrategyService, JwnStrategyService],
  controllers: [AuthController]
})
export class AuthModule {
}
