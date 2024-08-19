import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { MixinCreateDto, MixinPageDto } from '../../common/model/page.model'
import { Article } from './article.entity'

export class ArticleCreateReqDto extends MixinCreateDto(Article) {
  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

export class ArticleListReqDto extends MixinPageDto(Article, ['sort', 'title', 'pass_flag']) {
  @ApiProperty({ description: '分类 id' })
  cid?: number
}
