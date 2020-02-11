import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WORKING_DAYS {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  includedAccommodation: boolean;

  @Column()
  includedMeals: boolean;

  @Column()
  includedFreeRegistration: boolean;

  @Column()
  minAgeRestriction: number;

  @Column()
  maxAgeRestriction: number;

  @Column()
  salary: number;

  @Column({type: 'enum', enum: WORKING_DAYS, array: true})
  workingDays: string[];

  @Column()
  startOfWorkingHour: string;

  @Column()
  endOfWorkingHour: string;
}
