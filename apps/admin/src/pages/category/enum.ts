import { CategoryStatusEnumType, CategoryTypeEnumType } from '@/service'

export const CategoryStatusMap = [
  { label: '启用', value: CategoryStatusEnumType.Enable, color: 'success' },
  { label: '禁用', value: CategoryStatusEnumType.Block, color: 'error' },
]

export const CategoryTypeMap = [
  { label: '文章列表', value: CategoryTypeEnumType.List },
  { label: '单页', value: CategoryTypeEnumType.Page },
  { label: '外链', value: CategoryTypeEnumType.Url },
]

export enum CatetoryIdEnum {
  /** 根节点 id */
  Root = 0,
}
