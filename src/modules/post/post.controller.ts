import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto, PostDto } from '../../models/post.model';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

const TAG = 'posts';

@ApiTags(TAG)
@Controller(TAG)
export class PostController {

  constructor(public service: PostService) {}

  @ApiResponse({
    status: 200,
    type: [PostDto],
  })
  @Get()
  async findAll(): Promise<PostDto[]> {
    return this.service.findAll();
  }

  @ApiResponse({ status: 200, type: PostDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostDto> {
    return this.service.findOne(id);
  }

  @ApiResponse({ status: 201, type: PostDto })
  @Post()
  async create(@Body() post: PostCreateDto) {
    return this.service.saveOne(post);
  }

  @ApiResponse({ status: 200 })
  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() post: PostCreateDto) {
    return this.service.updateOne(id, post);
  }

}
