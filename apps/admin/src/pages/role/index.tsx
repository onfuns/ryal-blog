import { roleService, type RoleType } from '@/service'
import { Table, TableActionType, TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, message } from 'antd'
import { useRef } from 'react'
import { RoleAdd } from './components/Add'

const RolePage = () => {
  const actionRef = useRef<TableActionType>()

  const onDelete = async (id: RoleType['id']) => {
    await roleService.delete(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current?.reload()

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
      render: (_, record) => {
        return (
          <Space>
            <RoleAdd detail={record} onSuccess={onReload} trigger={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="a-danger">删除</a>
            </Popconfirm>
          </Space>
        )
      },
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
        return await roleService.getList({ ...params })
      }}
      pagination={false}
      toolBarRender={() => [
        <RoleAdd key="add" onSuccess={onReload} trigger={<Button>新增</Button>} />,
      ]}
    />
  )
}

export default RolePage
