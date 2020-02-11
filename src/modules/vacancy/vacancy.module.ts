import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from '../../entites/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  providers: [VacancyService],
  controllers: [VacancyController],
})
export class VacancyModule {}
