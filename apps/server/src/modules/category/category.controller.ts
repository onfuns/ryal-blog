import { ApiResult } from '@/decorator/api-result.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CategoryCreateReqDto, CategoryListItemDto } from './category.dto'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

@ApiTags('category')
@Controller('/category')
export class CategoryController {
  constructor(@Inject(CategoryService) private readonly service: CategoryService) {}

  @ApiResult({
    description: '获取分类列表',
    type: [CategoryListItemDto],
  })
  @Get()
  async getList() {
    return await this.service.findAll({ isToTree: true })
  }

  @ApiResult({
    description: '客户端-获取分类列表',
    type: [CategoryListItemDto],
  })
  @Get('list')
  @NoPermission()
  async getClientList() {
    return await this.service.findAll({ isToTree: true })
  }

  @ApiResult({
    description: '创建分类',
    type: Category,
  })
  @Post()
  async add(@Body() body: CategoryCreateReqDto) {
    return this.service.create(body)
  }

  @ApiResult({
    description: '更新分类',
    type: Category,
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: Category['id'], @Body() body: CategoryCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除分类',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.service.delete(id)
  }
}
