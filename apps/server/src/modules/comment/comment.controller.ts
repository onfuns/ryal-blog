import { ApiResult } from '@/decorator/api-result.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { CommentCreateParams, CommentGetListParams } from './comment.dto'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'

@ApiTags('comment')
@Controller('/comment')
export class CommentController {
  constructor(@Inject(CommentService) private readonly service: CommentService) {}

  @ApiResult({ description: '获取留言列表', type: [Comment], page: true })
  @Get()
  async getList(@Query() query: CommentGetListParams) {
    return this.service.getList(query)
  }

  @ApiResult({ description: '客户端-获取留言列表', type: [Comment], page: true })
  @Get('list')
  @NoPermission()
  async getClientList(@Body() body: CommentGetListParams) {
    return this.service.getList({ aid: body.aid, pageSize: 100 })
  }

  @ApiResult({ description: '新增留言', type: Comment })
  @Post()
  async add(@Body() body: CommentCreateParams) {
    return this.service.create(body)
  }

  @ApiResult({ description: '客户端-新增留言', type: Comment })
  @Post('add')
  @NoPermission()
  async addForClient(@Body() body: CommentCreateParams) {
    return this.service.create(body)
  }

  @ApiResult({ description: '更新留言', type: Comment })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(@Param('id') id: Comment['id'], @Body() body: CommentCreateParams) {
    return this.service.update(id, body)
  }

  @ApiResult({ description: '删除留言', type: Comment })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: Comment['id']) {
    return this.service.delete(id)
  }
}
