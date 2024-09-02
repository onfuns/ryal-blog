import { type ClassDataType } from '@/type'
/** 列表结果类型 */
export type ResultListData<DataType> = { data?: DataType[]; total?: number }
/** 详情结果 */
export type ResultItemData<DataType> = Partial<DataType>

export class Base<StoreDataType> {
  setData<U extends keyof ClassDataType<StoreDataType>>(
    key: U,
    value: U extends keyof ClassDataType<StoreDataType> ? ClassDataType<StoreDataType>[U] : never,
  ) {
    ;(this as ClassDataType<StoreDataType>)[key] = value
  }
}
