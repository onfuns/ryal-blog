import { transformToNumber } from '@/util'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { Article } from './article.entity'

/** ----- 入参开始 ------- */

/**创建文章入参 */
export class ArticleCreateReq {
  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

/** 获取文章列表入参 */
export class ArticleListReq {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  current?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  pageSize?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  sort?: number

  @IsOptional()
  title?: string

  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  cid?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  pass_flag?: number
}

/** ----- 入参结束 ------- */

/** ----- 返回结果开始 ------- */
/** 获取列表结果 */
export class ArticleListRes {
  @ApiProperty({ type: Article, isArray: true, description: '列表数据' })
  data: Article[]

  @ApiProperty({ description: '总数' })
  count: number
}

/** ----- 返回结果结束 ------- */
