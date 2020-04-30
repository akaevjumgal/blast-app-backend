import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PostEntity } from '../../entites/post.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostCreateDto, PostDto } from '../../models/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return await this.repository.find()
  }

  async findOne(id: number): Promise<PostEntity> {
    const result = await this.repository.findOne(id)

    if (!result) {
      throw new HttpException(`No vacancy with id ${id}`, HttpStatus.NOT_FOUND)
    }

    return result
  }

  async saveOne(post: PostCreateDto): Promise<PostEntity> {
    return await this.repository.save(post)
  }

  async updateOne(id: number, post: PostCreateDto): Promise<void> {
    await this.repository.update(id, post)
  }
}
