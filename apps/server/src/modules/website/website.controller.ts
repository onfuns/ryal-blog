import { ApiResult } from '@/decorator/api-result.decorator'
import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WebsiteCreateReqDto } from './website.dto'
import { Website } from './website.entity'
import { WebsiteService } from './website.service'

@ApiTags('website')
@Controller('/website')
export class WebsiteController {
  constructor(@Inject(WebsiteService) private readonly service: WebsiteService) {}

  @ApiResult({ description: '获取配置列表', type: Website })
  @Get()
  async getList() {
    return this.service.findAll()
  }

  @ApiResult({ description: '客户端-获取配置列表', type: Website })
  @Get('info')
  @NoPermission()
  async getClientList() {
    return this.service.findAll()
  }

  @ApiResult({ description: '更新配置', type: Website })
  @Post()
  async update(@Body() body: WebsiteCreateReqDto) {
    return this.service.update(body)
  }
}
