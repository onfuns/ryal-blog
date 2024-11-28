import { arrayToTree } from '@/util'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Repository } from 'typeorm'
import { ResponseResult } from '../../common/model/response.model'
import { CategoryCreateParams } from './category.dto'
import { Category } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: CategoryCreateParams): Promise<Category> {
    return await this.repository.save(data)
  }

  async getList({
    isToTree = false,
    type,
  }: {
    isToTree?: boolean
  } & Pick<Partial<Category>, 'type'>): Promise<Category[]> {
    const where = pickBy({
      type,
    })
    const data = await this.repository.find({
      where,
      order: { sort: 'DESC' },
    })
    if (isToTree) {
      return arrayToTree(data)
    }
    return data
  }

  async update(id: Category['id'], body: CategoryCreateParams): Promise<Category> {
    const { raw } = await this.repository.update(id, body)
    return raw
  }

  async delete(id: Category['id']): Promise<null | ResponseResult> {
    try {
      await this.repository.delete(id)
      return null
    } catch (err) {
      const message = err.message.includes('a foreign key constraint fails')
        ? '有文章引用分类，无法删除'
        : err.message
      return new ResponseResult(false, null, message)
    }
  }
}
