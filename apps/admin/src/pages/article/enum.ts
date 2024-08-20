export enum SortTypeEnum {
  /** 置顶 */
  Top = 1,
  /** 未置顶 */
  UnTop = 0,
}

export enum PassTypeEnum {
  /** 已审核 */
  Audited = 1,
  /** 未审核 */
  UnAudited = 0,
}

export enum CommentTypeEnum {
  /** 开放 */
  Opened = 1,
  /** 关闭 */
  Closed = 0,
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
