import { roleService, type RoleType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'

const RolePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete', { id }: RoleType) => {
    switch (type) {
      case 'delete':
        await roleService.delete(id)
        break
      default:
        break
    }
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
        <TriggerAddModal key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
      ],
    },
  ]

  return (
    <Table<RoleType>
      actionRef={actionRef}
      columns={columns}
      search={false}
      rowKey="id"
      request={roleService.getList}
      pagination={false}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增角色</Button>}
        />,
      ]}
    />
  )
}

export default RolePage
