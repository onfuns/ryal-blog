import { ApiResult } from '@/decorator/api-result.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ArticleCreateReqDto, ArticleListReqDto } from './article.dto'
import { Article } from './article.entity'
import { ArticleService } from './article.service'

@ApiTags('article')
@Controller('/article')
export class ArticleController {
  constructor(@Inject(ArticleService) private readonly service: ArticleService) {}

  @ApiResult({
    description: '获取文章列表',
    type: [Article],
    page: true,
  })
  @Get()
  async getList(@Query() query: ArticleListReqDto) {
    return this.service.findAll(query)
  }

  @ApiResult({
    description: '客户端-获取文章列表',
    type: Article,
    page: true,
  })
  @Get('list')
  @NoPermission()
  async getClientList(@Query() query: ArticleListReqDto) {
    return this.service.findAll({ ...query, pass_flag: 1 })
  }

  @ApiResult({
    description: '创建文章',
    type: Article,
  })
  @Post()
  async add(@Body() body: ArticleCreateReqDto) {
    return this.service.create(body as Article)
  }

  @ApiResult({
    description: '更新文章',
    type: Article,
  })
  @Put(':id')
  async update(@Param('id') id: Article['id'], @Body() body: ArticleCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除文章',
  })
  @Delete(':id')
  async delete(@Param('id') id: Article['id']) {
    return this.service.delete(id)
  }

  @ApiResult({
    description: '获取文章详情',
    type: Article,
  })
  @Get(':id')
  @NoPermission()
  async info(@Param('id') id: Article['id']) {
    return this.service.findById(id)
  }
}
