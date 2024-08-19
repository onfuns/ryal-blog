import { ResponseResult } from '@/common/model/response.model'
import config from '@/config'
import { ApiResult } from '@/decorator/api-result.decorator'
import { IP } from '@/decorator/ip.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { UserCreateReqDto, UserLoginReqDto, UserLoginResDto } from './user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}

  @ApiResult({
    description: '登录',
    type: User,
  })
  @Post('login')
  @NoPermission()
  async login(
    @Body() body: UserLoginReqDto,
    @IP() cleintIp: string,
  ): Promise<UserLoginResDto | ResponseResult> {
    const { name, password } = body
    const data: User = await this.service.login({ name, password })
    if (!data) {
      return new ResponseResult(false, null, '用户名或密码错误')
    }
    const token = this.service.createToken({
      secret: config.jwtToken,
      id: data.id,
      name: data.name,
    })
    await this.service.updateLoginInfo(data.id, {
      last_login_at: new Date().toString(),
      last_login_ip: cleintIp,
    })
    return { userName: name, token }
  }

  @ApiResult({
    description: '获取用户列表',
    type: [User],
  })
  @Get()
  async getList() {
    return this.service.findAll()
  }

  @ApiResult({
    description: '新增用户',
    type: User,
  })
  @Post()
  async add(@Body() body: UserCreateReqDto) {
    return this.service.create(body)
  }

  @ApiResult({
    description: '更新用户',
    type: User,
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(@Param('id') id: User['id'], @Body() body: UserCreateReqDto) {
    return this.service.update(id, body)
  }

  @ApiResult({
    description: '删除用户',
    type: User,
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: User['id']) {
    return this.service.delete(id)
  }
}
