export enum ArticlePassStatusEnum {
  /** 已审核 */
  Audited = 'audited',
  /** 未审核 */
  Unaudited = 'un_audited',
}

export enum ArticleCommentStatusEnum {
  /**  开放 */
  Opened = 'opened',
  /** 关闭 */
  Closed = 'closed',
}

export enum ArticleEditorTypeEnum {
  /** markdown */
  Markdown = 'markdown',
  /** 富文本 */
  Text = 'text',
}
