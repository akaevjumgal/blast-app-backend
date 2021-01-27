import { ApiProperty } from '@nestjsx/crud/lib/crud'

export interface UserResponseObject {
  id: number
  firstName: string
  lastName: string
  email: string
}

export class CreateUserDto {
  @ApiProperty()
  readonly firstName: string

  @ApiProperty()
  readonly lastName: string

  @ApiProperty()
  readonly email: string

  @ApiProperty()
  readonly password: string
}
