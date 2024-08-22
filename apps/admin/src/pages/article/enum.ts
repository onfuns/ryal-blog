export enum SortTypeEnum {
  /** 置顶 */
  Top = 1,
  /** 未置顶 */
  UnTop = 0,
}

export enum AuthIdEnum {
  /** 根节点 id */
  Root = 0,
}

export enum DataActionType {
  /** 置顶 */
  Sort = 'sort',
  /**  审核 */
  Pass = 'pass',
  /** 删除 */
  Delete = 'delete',
}
