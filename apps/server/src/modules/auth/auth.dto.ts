import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CreateParams } from '../../common/model/page.model'
import { Auth } from './auth.entity'

export class AuthCreateParams extends CreateParams(Auth) {
  @ApiProperty({ description: '权限名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '权限编码' })
  @IsNotEmpty({ message: '编码不能为空' })
  readonly code: string
}
