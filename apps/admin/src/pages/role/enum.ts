export enum RoleStatusEnum {
  /** 启用 */
  Enable = 1,
  /** 禁用 */
  Block = 0,
}

export const RoleStatusMap = [
  { label: '启用', value: RoleStatusEnum.Enable, color: 'success' },
  { label: '禁用', value: RoleStatusEnum.Block, color: 'error' },
]
