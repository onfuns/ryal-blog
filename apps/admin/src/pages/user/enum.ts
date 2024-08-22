import { UserStatusEnumType } from '@/service'

export const UserStatusMap = [
  { label: '启用', value: UserStatusEnumType.Enable, color: 'success' },
  { label: '停用', value: UserStatusEnumType.Block, color: 'error' },
]
