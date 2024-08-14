import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ArticleCreateReq, ArticleListReq, ArticleListRes } from './article.dto'
import { Article } from './article.entity'
import { ArticleService } from './article.service'

@ApiTags('article')
@Controller('/article')
export class ArticleController {
  constructor(@Inject(ArticleService) private readonly service: ArticleService) {}

  @ApiOkResponse({
    description: '查找文章列表',
    type: ArticleListRes,
  })
  @Get()
  async findAll(@Query() query: ArticleListReq) {
    return this.service.findAll(query)
  }

  @ApiOkResponse({
    description: '客户端-查找文章列表',
    type: Article,
    isArray: true,
  })
  @Get('list')
  @NoPermission()
  async getClientList(@Query() query: ArticleListReq) {
    return this.findAll({ ...query, pass_flag: 1 })
  }

  @Post()
  async add(@Body() body: ArticleCreateReq) {
    return this.service.create(body as Article)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id)
  }

  @Get(':id')
  @NoPermission()
  async info(@Param('id') id: string) {
    return this.service.findById(id)
  }
}
