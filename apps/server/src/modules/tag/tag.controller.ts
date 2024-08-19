import { ApiResult } from '@/decorator/api-result.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { TagCreateReqDto } from './tag.dto'
import { Tag } from './tag.entity'
import { TagService } from './tag.service'

@ApiTags('tag')
@Controller('/tag')
export class TagController {
  constructor(@Inject(TagService) private readonly service: TagService) {}

  @ApiResult({
    description: '获取标签列表',
    type: [Tag],
  })
  @Get()
  async getList() {
    return this.service.findAll()
  }

  @ApiResult({
    description: '新增标签',
    type: Tag,
  })
  @Post()
  async add(@Body() body: TagCreateReqDto) {
    return this.service.create(body)
  }

  @ApiResult({
    description: '更新标签',
    type: Tag,
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(@Param('id') id: Tag['id'], @Body() body: TagCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除标签',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: Tag['id']) {
    return this.service.delete(id)
  }
}
