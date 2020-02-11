import {ApiProperty} from '@nestjs/swagger';
import { Vacancy } from '../entites/vacancy.entity';

export class VacancyDto extends Vacancy {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly includedAccommodation: boolean;

  @ApiProperty()
  readonly includedMeals: boolean;

  @ApiProperty()
  readonly includedFreeRegistration: boolean;

  @ApiProperty()
  readonly minAgeRestriction: number;

  @ApiProperty()
  readonly maxAgeRestriction: number;

  @ApiProperty()
  readonly salary: number;

  @ApiProperty()
  readonly workingDays: string[];

  @ApiProperty()
  readonly startOfWorkingHour: string;

  @ApiProperty()
  readonly endOfWorkingHour: string;
}
