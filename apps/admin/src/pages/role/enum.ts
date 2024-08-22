import { RoleStatusEnumType } from '@/service'

export const RoleStatusMap = [
  { label: '启用', value: RoleStatusEnumType.Enable, color: 'success' },
  { label: '禁用', value: RoleStatusEnumType.Block, color: 'error' },
]
