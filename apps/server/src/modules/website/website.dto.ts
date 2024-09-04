import { CreateParams } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { Website } from './website.entity'

export class WebsiteCreateItem extends CreateParams(Website) {}

export class WebsiteCreateParams {
  @ApiProperty({ description: '全局配置列表', type: [WebsiteCreateItem] })
  readonly list: WebsiteCreateItem[]
}
