import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthCreateReqDto } from './auth.dto'
import { Auth } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>,
  ) {}

  async create(data: AuthCreateReqDto): Promise<Auth> {
    return await this.repository.save(data)
  }

  async getList(): Promise<Auth[]> {
    return await this.repository.find({
      order: {
        created_at: 'ASC',
      },
    })
  }

  async update(id: Auth['id'], body: AuthCreateReqDto): Promise<Auth> {
    const { raw } = await this.repository.update(id, body)
    return raw
  }

  async delete(id: Auth['id']): Promise<null> {
    await this.repository.delete(id)
    return null
  }

  async verify(ids: string) {
    const idArr = ids?.split(',')
    const data = await this.getList()
    return data.filter(d => idArr.includes(d.id.toString()))
  }
}
