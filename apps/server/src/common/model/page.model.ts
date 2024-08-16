import { transformToNumber } from '@/util'
import { Type } from '@nestjs/common'
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PageListType<TData = any> {
  /** 结果 */
  data: TData[]
  /** 总数 */
  total: number
}

export class PageDto {
  @ApiProperty({ description: '当前页码' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  current?: number

  @ApiProperty({ description: '当前条数' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  pageSize?: number
}

export function MixinPageDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  return IntersectionType(PageDto, PartialType(PickType(entity, keys)))
}

export function MixinCreateDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  return PartialType(OmitType(entity, keys))
}
