import { ApiProperty } from '@nestjs/swagger'

export interface JwtPayload {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface RegistrationStatus {
  success: boolean
  message: string
}

export interface IToken {
  readonly token: string
}

export class LoginUserDto {
  @ApiProperty()
  readonly email: string

  @ApiProperty()
  readonly password: string
}
