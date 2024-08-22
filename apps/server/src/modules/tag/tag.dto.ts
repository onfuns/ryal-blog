import { MixinCreateDto, MixinPageListReqDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Tag } from './tag.entity'

export class TagCreateReqDto extends MixinCreateDto(Tag) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class TagListReqDto extends MixinPageListReqDto(Tag, ['name']) {}
