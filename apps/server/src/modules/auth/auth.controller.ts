import { ApiResult } from '@/decorator/api-result.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { AuthCreateParams } from './auth.dto'
import { Auth } from './auth.entity'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @ApiResult({ description: '获取权限列表', type: [Auth] })
  @Get()
  async getList() {
    return this.service.getList()
  }

  @ApiResult({ description: '创建权限', type: Auth })
  @Post()
  async add(@Body() body: AuthCreateParams) {
    return this.service.create(body)
  }

  @ApiResult({ description: '更新权限', type: Auth })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(@Param('id') id: Auth['id'], @Body() body: AuthCreateParams) {
    return this.service.update(id, body)
  }

  @ApiResult({ description: '删除权限' })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: Auth['id']) {
    return this.service.delete(id)
  }
}
