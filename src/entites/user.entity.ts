import { BeforeInsert, Column, Entity } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { UserResponseObject } from '../models/user.model'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }

  toResponseObject(showToken: boolean = true) {
    const {id, firstName, lastName, email} = this
    const responseObject: UserResponseObject = {
      id,
      firstName,
      lastName,
      email
    }
    return responseObject
  }
}
