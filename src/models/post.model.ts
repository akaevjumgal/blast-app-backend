import {ApiProperty} from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly publishedAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class PostCreateDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;
}
