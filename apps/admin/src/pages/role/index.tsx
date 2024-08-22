import { roleService, type RoleType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { useRef } from 'react'
import { RoleAdd } from './components/Add'

const RolePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onDelete = async (id: RoleType['id']) => {
    await roleService.delete(id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<RoleType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <RoleAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onDelete(record.id)} />,
      ],
    },
  ]

  return (
    <Table<RoleType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="角色列表"
      search={false}
      rowKey="id"
      request={async params => {
        const { success, data } = await roleService.getList({ ...params })
        return { success, data: data?.list || [], total: data?.total }
      }}
      pagination={false}
      toolBarRender={() => [
        <RoleAdd
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增角色</Button>}
        />,
      ]}
    />
  )
}

export default RolePage
