import { Inject, Controller, Post, Get, Body, SetMetadata } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Auth } from './auth.entity'
@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @Get('list')
  @SetMetadata('roles', ['all'])
  async findAll() {
    return this.service.findAll()
  }

  @Post('add')
  async add(@Body() body: Auth) {
    return this.service.create(body)
  }

  @Post('update')
  async update(@Body() body) {
    return this.service.update(body)
  }

  @Post('delete')
  async delete(@Body() body) {
    return this.service.delete(body)
  }
}
