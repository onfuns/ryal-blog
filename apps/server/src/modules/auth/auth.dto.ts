import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { MixinCreateDto } from '../../common/model/page.model'
import { Auth } from './auth.entity'

export class AuthCreateReqDto extends MixinCreateDto(Auth) {
  @ApiProperty()
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string

  @ApiProperty()
  @IsNotEmpty({ message: '编码不能为空' })
  readonly code: string
}
