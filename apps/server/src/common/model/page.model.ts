import { Type } from '@nestjs/common'
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class PageListResModel<TData = any> {
  /** 结果 */
  @ApiProperty({ description: '结果' })
  data: TData[]

  @ApiProperty({ description: '总数' })
  /** 总数 */
  total: number
}

export class PageReqDto {
  @ApiProperty({ description: '当前页码' })
  @IsNumber()
  current?: number

  @ApiProperty({ description: '当前条数' })
  @IsNumber()
  pageSize?: number
}

export function MixinPageListReqDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  return IntersectionType(PartialType(PageReqDto), PartialType(PickType(entity, keys || [])))
}

export function MixinCreateDto<T, K extends keyof T>(entity: Type<T>, keys?: K[]) {
  const defaultKeys = ['id', 'created_at', 'updated_at']
  return PartialType(OmitType(entity, [...(keys || []), ...defaultKeys] as []))
}
