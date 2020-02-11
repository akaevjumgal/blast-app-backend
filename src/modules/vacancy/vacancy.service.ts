import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Vacancy } from '../../entites/vacancy.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class VacancyService {
  constructor(@InjectRepository(Vacancy) private readonly vacancyRepo: Repository<Vacancy>) {
  }

  async findAll(): Promise<Vacancy[]> {
    return await this.vacancyRepo.find()
  }

  async findOne(id: number): Promise<Vacancy> {
    const result = await this.vacancyRepo.findOne(id)

    if (!result) {
      throw new HttpException(`No vacancy with id ${id}`, HttpStatus.NOT_FOUND)
    }

    return result
  }
}
