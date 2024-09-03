import { CreateParamsDto, PageListParamsDto } from '@/common/model/page.model'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Comment } from './comment.entity'

export class CommentCreateReqDto extends CreateParamsDto(Comment) {
  @ApiProperty({ description: '昵称' })
  @IsNotEmpty({ message: '昵称不能为空' })
  readonly name: string

  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

export class CommentListReqDto extends PageListParamsDto(Comment, ['aid']) {
  @ApiPropertyOptional({ description: '文章标题' })
  readonly title?: string
}
