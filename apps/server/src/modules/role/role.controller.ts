import { ApiResult } from '@/decorator/api-result.decorator'
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
import { RoleCreateReqDto } from './role.dto'
import { Role } from './role.entity'
import { RoleService } from './role.service'

@ApiTags('role')
@Controller('/role')
export class RoleController {
  constructor(@Inject(RoleService) private readonly service: RoleService) {}

  @ApiResult({
    description: '获取角色列表',
    type: [Role],
  })
  @Get()
  async getList() {
    return this.service.findAll()
  }

  @ApiResult({
    description: '新增角色',
    type: Role,
  })
  @Post()
  async add(@Body() body: RoleCreateReqDto) {
    return this.service.create(body)
  }

  @ApiResult({
    description: '更新角色',
    type: Role,
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: Role['id'], @Body() body: RoleCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除角色',
    type: Role,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: Role['id']) {
    return this.service.delete(id)
  }
}
