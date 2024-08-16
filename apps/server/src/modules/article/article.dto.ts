import { transformToNumber } from '@/util'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { MixinCreateDto, MixinPageDto } from '../../common/model/page.model'
import { Article } from './article.entity'

/**创建文章入参 */
export class ArticleCreateReqDto extends MixinCreateDto(Article, [
  'id',
  'created_at',
  'updated_at',
]) {
  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

/** 获取文章列表入参 */
export class ArticleListReqDto extends MixinPageDto(Article, ['sort', 'title', 'pass_flag']) {
  @ApiProperty({ description: '分类 id' })
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  cid?: number
}
