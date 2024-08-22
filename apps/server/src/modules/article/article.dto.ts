import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { MixinCreateDto, MixinPageListReqDto } from '../../common/model/page.model'
import { Article } from './article.entity'

export class ArticleCreateReqDto extends MixinCreateDto(Article) {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty({ description: '文章内容' })
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

export class ArticleListReqDto extends MixinPageListReqDto(Article, [
  'sort',
  'title',
  'pass_status',
]) {
  @ApiPropertyOptional({ description: '分类 id' })
  @IsOptional()
  cid?: number
}
