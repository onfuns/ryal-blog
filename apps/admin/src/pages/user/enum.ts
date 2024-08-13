export enum UserStatus {
  /** 启用 */
  Enable = 1,
  /** 停用 */
  Block = 0,
}

export const UserStatusMap = [
  { label: '启用', value: UserStatus.Enable },
  { label: '停用', value: UserStatus.Block },
]
