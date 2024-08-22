import { AuthNodeTypeEnumType } from '@/service'

export const AuthNodeTypeMap = [
  { label: '菜单', value: AuthNodeTypeEnumType.Menu },
  { label: '功能', value: AuthNodeTypeEnumType.Action },
]

export enum AuthIdEnum {
  /** 根节点 id */
  Root = 0,
}
