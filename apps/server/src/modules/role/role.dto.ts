import { CreateParams, PageListParams } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Role } from './role.entity'

export class RoleCreateParams extends CreateParams(Role) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class RoleGetListParams extends PageListParams(Role, ['name', 'status']) {}
