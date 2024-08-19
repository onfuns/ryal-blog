import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagCreateReqDto } from './tag.dto'
import { Tag } from './tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async create(data: TagCreateReqDto): Promise<Tag> {
    return await this.repository.save(data)
  }

  async findAll(): Promise<Tag[]> {
    return await this.repository.find({
      order: {
        created_at: 'DESC',
      },
    })
  }

  async update(id: Tag['id'], body: TagCreateReqDto): Promise<Tag> {
    const { raw } = await this.repository.update(id, body)
    return raw
  }

  async delete(id: Tag['id']): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
