import { PageListResModel } from '@/common/model/page.model'
import config from '@/config'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as jwt from 'jsonwebtoken'
import { pickBy } from 'lodash'
import { Like, Repository } from 'typeorm'
import { UserCreateReqDto, UserListReqDto, UserLoginReqDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly repository: Repository<User>
  constructor() {}

  async login({ name, password }: UserLoginReqDto) {
    return await this.repository.findOne({
      where: { name, password },
    })
  }

  createToken(data: { secret: string; id: number; name: string }) {
    const token = jwt.sign(data, config.jwtToken, {
      expiresIn: '24h',
    })
    return token
  }

  verifyToken(token: string) {
    if (!token) {
      return false
    }
    const { jwtToken } = config
    try {
      const decoded = jwt.verify(token, jwtToken)
      if (typeof decoded !== 'string' && decoded?.secret === jwtToken) {
        return decoded
      }
    } catch (err) {
      console.log('verifyToken error ', err)
    }
    return false
  }

  async create(body: UserCreateReqDto): Promise<User> {
    const { roles, ...others } = body
    const record = this.repository.create(others)
    record.roles = roles
    return await this.repository.save(record)
  }

  async getList(query?: UserListReqDto): Promise<PageListResModel<User>> {
    const { current = 1, pageSize = 20, name, roleId, status } = query || {}

    const where = pickBy({
      name: name ? Like(`%${name}%`) : undefined,
      role_id: roleId,
      status,
    })

    const [data = [], total = 0] = await this.repository.findAndCount({
      where,
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.roles',
        },
      },
      skip: pageSize * (current - 1),
      take: pageSize,
      order: { created_at: 'DESC' },
    })

    return { data, total }
  }

  async findById(id: number): Promise<User> {
    const data = await this.repository.findOne({
      where: { id },
      relations: ['roles', 'roles.auths'],
    })
    return data
  }

  async update(id: number, body: UserCreateReqDto): Promise<User> {
    const record = this.repository.create(body)
    record.id = id
    return await this.repository.save(record)
  }

  async updateLoginInfo(
    id: number,
    body: {
      last_login_at: User['last_login_at']
      last_login_ip: User['last_login_ip']
    },
  ) {
    return await this.repository.update(id, body)
  }

  async delete(id: number): Promise<null> {
    await this.repository.delete(id)
    return null
  }
}
