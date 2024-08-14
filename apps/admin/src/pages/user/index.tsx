import { deleteUser, getUserList } from '@/actions'
import { Table, Time, type TableActionType, type TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, Tag, message } from 'antd'
import { useRef } from 'react'
import { UserAdd } from './components/Add'
import { UserStatus } from './enum'

const UserPage = () => {
  const actionRef = useRef<TableActionType>()

  const onDelete = async (id: number) => {
    await deleteUser(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current?.reload()

  const columns: TableColumns<any>[] = [
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
      render: (_, record) => {
        return record?.roles?.map(({ id, name }: any) => (
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
      render: (_, { last_login_ip }) => last_login_ip && last_login_ip.replace('::ffff:', ''),
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
      valueEnum: {
        [UserStatus.Enable]: '正常',
        [UserStatus.Block]: '停用',
      },
      render: (_, { enable }) => {
        const statusMap: Record<any, { text: string; color: string }> = {
          [UserStatus.Enable]: { text: '正常', color: 'success' },
          [UserStatus.Block]: { text: '停用', color: 'error' },
        }
        const { color, text } = statusMap[enable] || {}
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => {
        return record.super !== 1 ? (
          <Space>
            <UserAdd detail={record} onSuccess={onReload} trigger={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="a-danger">删除</a>
            </Popconfirm>
          </Space>
        ) : null
      },
    },
  ]

  return (
    <Table
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={getUserList}
      toolBarRender={() => [
        <UserAdd
          key="add"
          onSuccess={onReload}
          trigger={<Button type="primary">新增用户</Button>}
        />,
      ]}
    />
  )
}

export default UserPage
