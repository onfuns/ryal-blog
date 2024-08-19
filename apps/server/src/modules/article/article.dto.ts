import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { MixinCreateDto, MixinPageListDto } from '../../common/model/page.model'
import { Article } from './article.entity'

export class ArticleCreateReqDto extends MixinCreateDto(Article) {
  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

export class ArticleListReqDto extends MixinPageListDto(Article, ['sort', 'title', 'pass_flag']) {
  @ApiPropertyOptional({ description: '分类 id' })
  @IsOptional()
  cid?: number
}
