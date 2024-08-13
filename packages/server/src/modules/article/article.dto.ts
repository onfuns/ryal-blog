import { transformToNumber } from '@/util'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class ActionDto {
  @IsNotEmpty()
  readonly id: string
}

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string
}

export class QueryDto {
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
