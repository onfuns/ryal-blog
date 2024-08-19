import { MixinCreateDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Website } from './website.entity'

export class WebsiteCreateReqDto extends MixinCreateDto(Website) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}
