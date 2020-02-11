import { Controller, Get, Logger, Param } from '@nestjs/common'
import { VacancyService } from './vacancy.service';
import { VacancyDto } from '../../models/vacancy.model';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

const TAG = 'vacancies';

@ApiTags(TAG)
@Controller(TAG)
export class VacancyController {

  constructor(public service: VacancyService) {}

  @ApiResponse({
    status: 200,
    type: [VacancyDto],
  })
  @Get()
  async findAll(): Promise<VacancyDto[]> {
    return this.service.findAll();
  }

  @ApiResponse({ status: 200, type: VacancyDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<VacancyDto> {
    return this.service.findOne(id);
  }

}
