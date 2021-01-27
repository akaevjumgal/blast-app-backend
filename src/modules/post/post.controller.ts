import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
import { PostCreateDto, PostDto } from '../../models/post.model'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

const TAG = 'posts'

@ApiTags(TAG)
@Controller(TAG)
export class PostController {

  constructor(public service: PostService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PostDto]
  })
  @Get()
  async findAll(): Promise<PostDto[]> {
    return this.service.findAll()
  }

  @ApiResponse({ status: HttpStatus.OK, type: PostDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostDto> {
    return this.service.findOne(id)
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: PostDto })
  @Post()
  async create(@Body() post: PostCreateDto) {
    return this.service.saveOne(post)
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() post: PostCreateDto) {
    return this.service.updateOne(id, post)
  }

  @ApiResponse({ status: HttpStatus.ACCEPTED })
  @Delete(':id')
  async removeOne(@Param('id') id: number) {
    return this.service.deleteOne(id)
  }

}
