import { PageListResultModel } from '@/common/model/page.model'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Like, Repository } from 'typeorm'
import { RoleCreateParams, RoleGetListParams } from './role.dto'
import { Role } from './role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(body: RoleCreateParams): Promise<Role> {
    const record = this.repository.create(body)
    return await this.repository.save(record)
  }

  async getList(query?: RoleGetListParams): Promise<PageListResultModel<Role>> {
    const { current = 1, pageSize = 20, name, status } = query || {}

    const where = pickBy({
      name: name ? Like(`%${name}%`) : undefined,
      status,
    })

    const [data = [], total = 0] = await this.repository.findAndCount({
      where,
      join: {
        alias: 'role',
        leftJoinAndSelect: {
          auth: 'role.auths',
        },
      },
      skip: pageSize * (current - 1),
      take: pageSize,
      order: { created_at: 'DESC' },
    })

    return { data, total }
  }

  async update(id: Role['id'], body: RoleCreateParams): Promise<Role> {
    const record = this.repository.create(body)
    record.id = id
    return await this.repository.save(record)
  }

  async delete(id: Role['id']): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
