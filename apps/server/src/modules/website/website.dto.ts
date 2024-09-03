import { CreateParamsDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { Website } from './website.entity'

export class WebsiteCreateItemDto extends CreateParamsDto(Website) {}

export class WebsiteCreateReqDto {
  @ApiProperty({ description: '全局配置列表', type: [WebsiteCreateItemDto] })
  readonly list: WebsiteCreateItemDto[]
}
