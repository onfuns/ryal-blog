import { PageListResultModel } from '@/common/model/page.model'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Like, Repository } from 'typeorm'
import { CommentCreateParamsDto, CommentGetListParamsDto } from './comment.dto'
import { Comment } from './comment.entity'
import { CommentStatusEnum } from './enum'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(data: CommentCreateParamsDto): Promise<Comment> {
    return await this.repository.save(data)
  }

  async getList(query?: CommentGetListParamsDto): Promise<PageListResultModel<Comment>> {
    const { current = 1, pageSize = 20, aid, title = '' } = query || {}
    const where = pickBy({ aid, status: CommentStatusEnum.Passed })
    const [data = [], total = 0] = await this.repository.findAndCount({
      where: {
        ...where,
        article: {
          title: Like(`%${title}%`),
        },
      },
      join: {
        alias: 'comment',
        leftJoinAndSelect: {
          article: 'comment.article',
        },
      },
      skip: pageSize * (current - 1),
      take: pageSize,
      order: { created_at: 'DESC' },
    })

    return { data, total }
  }

  async update(id: Comment['id'], body: CommentCreateParamsDto): Promise<Comment> {
    const { raw } = await this.repository.update(id, body)
    return raw
  }

  async delete(id: number): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
