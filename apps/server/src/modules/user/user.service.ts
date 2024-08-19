import config from '@/config'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as jwt from 'jsonwebtoken'
import { getRepository, Repository } from 'typeorm'
import { UserCreateReqDto, UserLoginReqDto } from './user.dto'
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
      if (decoded?.secret === jwtToken) {
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

  async findAll(): Promise<User[]> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .select(['user', 'role.id', 'role.name'])
      .leftJoin('user.roles', 'role')
      .getMany()
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id }, relations: ['roles', 'roles.auths'] })
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
