import { CreateParamsDto, PageListParamsDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Role } from './role.entity'

export class RoleCreateParamsDto extends CreateParamsDto(Role) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class RoleGetListParamsDto extends PageListParamsDto(Role, ['name', 'status']) {}
