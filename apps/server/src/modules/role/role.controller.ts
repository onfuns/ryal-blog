import { ApiResult } from '@/decorator/api-result.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { RoleCreateParamsDto, RoleGetListParamsDto } from './role.dto'
import { Role } from './role.entity'
import { RoleService } from './role.service'

@ApiTags('role')
@Controller('/role')
export class RoleController {
  constructor(@Inject(RoleService) private readonly service: RoleService) {}

  @ApiResult({ description: '获取角色列表', type: [Role], page: true })
  @Get()
  async getList(@Body() body: RoleGetListParamsDto) {
    return this.service.getList(body)
  }

  @ApiResult({ description: '新增角色', type: Role })
  @Post()
  async add(@Body() body: RoleCreateParamsDto) {
    return this.service.create(body)
  }

  @ApiResult({ description: '更新角色', type: Role })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(@Param('id') id: Role['id'], @Body() body: RoleCreateParamsDto) {
    return this.service.update(id, body)
  }

  @ApiResult({ description: '删除角色', type: Role })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: Role['id']) {
    return this.service.delete(id)
  }
}
