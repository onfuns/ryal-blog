import { ApiResult } from '@/decorator/api-result.decorator'
import { Controller, Get, Inject, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DashboardDataResDto } from './common.dto'
import { CommonService } from './common.service'

@ApiTags('common')
@Controller('/common')
export class CommonController {
  constructor(@Inject(CommonService) private readonly service: CommonService) {}

  @ApiResult({ description: '工作台', type: DashboardDataResDto })
  @Get('dashboard')
  async getDashboardData(@Req() req) {
    const token = req.headers['X-AUTH-ID-TOKEN'.toLowerCase()]
    return this.service.findDashboardData(token)
  }
}
