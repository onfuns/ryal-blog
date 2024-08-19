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
import { AuthCreateReqDto } from './auth.dto'
import { Auth } from './auth.entity'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @ApiResult({
    description: '获取权限列表',
    type: [Auth],
  })
  @Get()
  async getList() {
    return this.service.findAll()
  }

  @ApiResult({
    description: '创建权限',
    type: Auth,
  })
  @Post()
  async add(@Body() body: AuthCreateReqDto) {
    return this.service.create(body)
  }

  @ApiResult({
    description: '更新权限',
    type: Auth,
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: Auth['id'], @Body() body: AuthCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除权限',
  })
  @Delete(':id')
  async delete(@Body('id', ParseIntPipe) id: Auth['id']) {
    return this.service.delete(id)
  }
}
