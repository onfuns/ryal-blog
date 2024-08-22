import { PageListResModel } from '@/common/model/page.model'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Like, Repository } from 'typeorm'
import { TagCreateReqDto, TagListReqDto } from './tag.dto'
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

  async getList(query?: TagListReqDto): Promise<PageListResModel<Tag>> {
    const { current = 1, pageSize = 20, name } = query || {}

    const where = pickBy({
      name: name ? Like(`%${name}%`) : undefined,
    })

    const [data = [], total = 0] = await this.repository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: { created_at: 'DESC' },
    })

    return { data, total }
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
