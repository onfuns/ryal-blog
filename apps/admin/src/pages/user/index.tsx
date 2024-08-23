import { UserIdentityEnumType, userService, type UserType } from '@/service'
import { Table, TableDelete, Time, type TableActionType, type TableColumns } from '@ryal/ui-kit'
import { Button, Tag, message } from 'antd'
import { useRef } from 'react'
import { UserAdd } from './components/Add'
import { UserStatusMap } from './enum'

const UserPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete', { id }: UserType) => {
    switch (type) {
      case 'delete':
        await userService.delete(id)
        break
      default:
        break
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<UserType>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: '所属角色',
      dataIndex: 'roles',
      hideInSearch: true,
      render: (_, { roles }) => {
        return roles?.map(({ id, name }) => (
          <Tag key={id} color="blue">
            {name}
          </Tag>
        ))
      },
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_login_ip',
      hideInSearch: true,
      render: (_, { last_login_ip }) => last_login_ip?.replace('::ffff:', '') || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      render: (_, { created_at }) => <Time value={created_at} />,
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_at',
      hideInSearch: true,
      render: (_, { last_login_at }) => <Time value={last_login_at} />,
    },
    {
      title: '状态',
      dataIndex: 'enable',
      hideInSearch: true,
      width: 80,
      valueEnum: UserStatusMap.reduce((obj: Record<string, string>, current) => {
        obj[current.value] = current.label
        return obj
      }, {}),
      render: (_, { status }) => {
        const { color, label } = UserStatusMap.find(item => item.value === status) || {}
        return label ? <Tag color={color}>{label}</Tag> : '-'
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return (
          record.identity !== UserIdentityEnumType.Super && [
            <UserAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
            <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
          ]
        )
      },
    },
  ]

  return (
    <Table<UserType>
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={userService.getList}
      toolBarRender={() => [
        <UserAdd
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增用户</Button>}
        />,
      ]}
    />
  )
}

export default UserPage
