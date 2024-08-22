import { MixinCreateDto, MixinPageListReqDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Role } from './role.entity'

export class RoleCreateReqDto extends MixinCreateDto(Role) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class RoleListReqDto extends MixinPageListReqDto(Role, ['name', 'status']) {}
