import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { UserEntity } from '../../entites/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../../models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.repository.find()
  }

  public async findById(id: number): Promise<UserEntity> {
    return this.repository.findOneOrFail(id)
  }

  public async findByEmail(email: string) {
    return this.repository.findOne({ email })
  }

  public async create(user: CreateUserDto) {
    return this.repository.save(user)
  }

  public async update(id: number, userDto: CreateUserDto) {
    const user = await this.findById(id)

    if (!user.id) {
      throw new NotFoundException()
    }

    return this.repository.update(id, userDto)
  }

  public async delete(id: number) {
    return this.repository.delete(id)
  }

  public async register(userDto: CreateUserDto) {
    const {email} = userDto
    let user = await this.repository.findOne({where: { email }})

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST
      )
    }

    user = await this.repository.create(userDto)
    return this.repository.save(user)
  }
}
