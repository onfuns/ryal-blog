import { CreateParamsDto, PageListParamsDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Tag } from './tag.entity'

export class TagCreateParamsDto extends CreateParamsDto(Tag) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class TagGetListParamsDto extends PageListParamsDto(Tag, ['name']) {}
