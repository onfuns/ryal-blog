export enum UserStatusEnum {
  /** 启用 */
  Enable = 1,
  /** 停用 */
  Block = 0,
}

export enum UserIdentityEnum {
  /** 超级管理员 */
  Super = 1,
  /** 普通用户 */
  Normal = 0,
}

export const UserStatusMap = [
  { label: '启用', value: UserStatusEnum.Enable, color: 'success' },
  { label: '停用', value: UserStatusEnum.Block, color: 'error' },
]
