export enum AuthTypeEnum {
  /** 菜单 */
  Menu = 1,
  /** 功能 */
  Action = 2,
}

export const AuthTypeMap = [
  { label: '菜单', value: AuthTypeEnum.Menu },
  { label: '功能', value: AuthTypeEnum.Action },
]

export enum AuthIdEnum {
  /** 根节点 id */
  Root = 0,
}
