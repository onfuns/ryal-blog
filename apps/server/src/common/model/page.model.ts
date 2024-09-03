import { transformToNumber } from '@/util'
import { Type } from '@nestjs/common'
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class PageListResultModel<TData = any> {
  /** 结果 */
  @ApiProperty({ description: '结果' })
  data: TData[]

  @ApiProperty({ description: '总数' })
  /** 总数 */
  total: number
}

export class PageParamsDto {
  @ApiProperty({ description: '页码' })
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  current?: number

  @ApiProperty({ description: '条数' })
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  pageSize?: number
}

export function PageListParamsDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  return IntersectionType(PartialType(PageParamsDto), PartialType(PickType(entity, keys || [])))
}

export function CreateParamsDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  const defaultKeys = ['id', 'created_at', 'updated_at']
  return PartialType(OmitType(entity, [...(keys || []), ...defaultKeys] as []))
}
