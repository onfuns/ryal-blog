import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { RoleCreateReqDto } from './role.dto'
import { Role } from './role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(body: RoleCreateReqDto): Promise<Role> {
    const record = this.repository.create(body)
    return await this.repository.save(record)
  }

  async findAll(): Promise<Role[]> {
    return getRepository(Role)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.auths', 'auth')
      .getMany()
  }

  async update(id: Role['id'], body: RoleCreateReqDto): Promise<Role> {
    const record = this.repository.create(body)
    record.id = id
    return await this.repository.save(record)
  }

  async delete(id: Role['id']): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
