import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WebsiteCreateItem } from './website.dto'
import { Website } from './website.entity'

@Injectable()
export class WebsiteService {
  @InjectRepository(Website)
  private readonly repository: Repository<Website>

  async getList() {
    return this.repository.find()
  }

  async update(data: WebsiteCreateItem[]) {
    return this.repository.save(data)
  }
}
