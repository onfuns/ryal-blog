import { PageListResModel } from '@/common/model/page.model'
import { LoggerService } from '@/shared/logger/logger.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Equal, Like, MoreThan, Repository } from 'typeorm'
import { ArticleCreateReqDto, ArticleListReqDto } from './article.dto'
import { Article } from './article.entity'

@Injectable()
export class ArticleService {
  private readonly logger = new LoggerService(ArticleService.name)
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  async create(body: ArticleCreateReqDto): Promise<Article> {
    return await this.repository.save(body)
  }

  async findById(id: Article['id']): Promise<Article> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
      },
    })
  }

  async getList(query?: ArticleListReqDto): Promise<PageListResModel<Article>> {
    const { current = 1, pageSize = 20, sort, title, cid: category_id, pass_status } = query ?? {}
    const where = pickBy({
      title: title ? Like(`%${title}%`) : undefined,
      sort: sort > 0 ? MoreThan(sort) : sort === 0 ? Equal(0) : undefined,
      category_id,
      pass_status,
    })
    this.logger.info('getList where: ', where)
    const [data, total] = await this.repository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: {
        created_at: 'DESC',
      },
      relations: ['category', 'tags'],
    })
    return { data, total }
  }

  async update(id: Article['id'], body: ArticleCreateReqDto): Promise<Article> {
    const { tags, ...others } = body
    const record = this.repository.create(others)
    record.tags = tags
    record.id = id
    return await this.repository.save(record)
  }

  async delete(id: Article['id']): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
