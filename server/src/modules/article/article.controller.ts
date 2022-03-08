import { Inject, Controller, Post, Get, Body, Query, SetMetadata } from '@nestjs/common'
import { ArticleService } from './article.service'
import { Article } from './article.entity'
import { TagService } from '../tag/tag.service'
import { Tag } from '../tag/tag.entity'
import { CreateDto, UpdateDto } from './article.dto'
@Controller('/article')
export class ArticleController {
  constructor(
    @Inject(ArticleService) private readonly service: ArticleService,
    private readonly tagService: TagService,
  ) {}

  async getRelationTags(data: any[]) {
    const tags: Tag[] = await this.tagService.findAll()
    data?.map((data: Article & { tags: any[] }) => {
      data.tags = []
      tags.map((t: Tag) => {
        if (data?.tag_id?.split(',').includes(String(t.id))) data.tags.push(t)
      })
    })
    return data
  }

  @Get('list')
  async findAll(@Query() query) {
    const { list, count } = await this.service.findAll(query)
    const data = await this.getRelationTags(list)
    return { list: data, count }
  }

  @Get('client/list')
  async getClientList(@Query() query) {
    const { list, count } = await this.service.findAll({ ...query, pass_flag: 1 })
    const data = await this.getRelationTags(list)
    return { list: data, count }
  }

  @Post('create')
  async add(@Body() body: CreateDto) {
    return this.service.create(body as Article)
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.service.update(body as Article)
  }

  @Post('delete')
  async delete(@Body('id') id) {
    return this.service.delete(id)
  }

  @Get('info')
  @SetMetadata('roles', ['all'])
  async detail(@Query('id') id: string) {
    const data = await this.service.findOne(id)
    const list = await this.getRelationTags([data])
    return list?.[0]
  }
}
