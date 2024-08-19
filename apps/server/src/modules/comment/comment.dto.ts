import { MixinCreateDto, MixinPageDto } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Comment } from './comment.entity'

export class CommentCreateReqDto extends MixinCreateDto(Comment) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '路由' })
  @IsNotEmpty({ message: '路由不能为空' })
  readonly ename: string
}

export class CommentListReqDto extends MixinPageDto(Comment) {
  @ApiProperty({ description: '文章标题' })
  readonly title?: string
}
