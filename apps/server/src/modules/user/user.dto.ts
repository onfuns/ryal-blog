import { CreateParams, PageListParams } from '@/common/model/page.model'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { User } from './user.entity'

export class UserCreateParams extends CreateParams(User) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}

export class UserLoginParams {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}

export class UserLoginResult {
  @ApiProperty({ description: '用户名' })
  readonly userName: string

  @ApiProperty({ description: '用户 token' })
  readonly token: string
}

export class UserGetListParams extends PageListParams(User, ['status']) {
  @ApiPropertyOptional({ description: '用户名' })
  readonly name?: string

  @ApiPropertyOptional({ description: '角色 id' })
  readonly roleId?: string
}
