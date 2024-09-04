import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { CreateParams, PageListParams } from '../../common/model/page.model'
import { Tag } from '../tag/tag.entity'
import { Article } from './article.entity'

export class ArticleCreateParams extends CreateParams(Article, []) {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty({ description: '文章内容' })
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string

  @ApiPropertyOptional({ description: '标签 id', type: [PickType(Tag, ['id'])] })
  readonly tagIds: Pick<Tag, 'id'>[]
}

export class ArticleGetListParams extends PageListParams(Article, [
  'sort',
  'title',
  'pass_status',
]) {
  @ApiPropertyOptional({ description: '分类 id' })
  @IsOptional()
  cid?: number
}
