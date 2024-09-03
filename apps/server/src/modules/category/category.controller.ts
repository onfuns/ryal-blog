import { ApiResult } from '@/decorator/api-result.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { CategoryCreateParamsDto, CategoryListItemDto } from './category.dto'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

@ApiTags('category')
@Controller('/category')
export class CategoryController {
  constructor(@Inject(CategoryService) private readonly service: CategoryService) {}

  @ApiResult({ description: '获取分类列表', type: [CategoryListItemDto] })
  @Get()
  async getList() {
    return await this.service.getList({ isToTree: true })
  }

  @ApiResult({ description: '客户端-获取分类列表', type: [CategoryListItemDto] })
  @Get('list')
  @NoPermission()
  async getClientList() {
    return await this.service.getList({ isToTree: true })
  }

  @ApiResult({ description: '创建分类', type: Category })
  @Post()
  async add(@Body() body: CategoryCreateParamsDto) {
    return this.service.create(body)
  }

  @ApiResult({ description: '更新分类', type: Category })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async update(@Param('id') id: Category['id'], @Body() body: CategoryCreateParamsDto) {
    return this.service.update(id, body)
  }

  @ApiResult({ description: '删除分类' })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: Category['id']) {
    return this.service.delete(id)
  }
}
