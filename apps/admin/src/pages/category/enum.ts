export enum CategoryStatusEnum {
  /** 启用 */
  Enable = 1,
  /** 禁用 */
  Block = 0,
}

export const CategoryStatusMap = [
  { label: '启用', value: CategoryStatusEnum.Enable, color: 'success' },
  { label: '禁用', value: CategoryStatusEnum.Block, color: 'error' },
]

export enum CategoryTypeEnum {
  /** 文章列表 */
  List = 1,
  /** 单页 */
  Page = 2,
  /** 外链 */
  Url = 3,
}

export const CategoryTypeMap = [
  { label: '文章列表', value: CategoryTypeEnum.List },
  { label: '单页', value: CategoryTypeEnum.Page },
  { label: '外链', value: CategoryTypeEnum.Url },
]

export enum CatetoryIdEnum {
  /** 根节点 id */
  Root = 0,
}
