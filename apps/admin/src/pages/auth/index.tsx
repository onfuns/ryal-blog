import { authService, type AuthType } from '@/service'
import { arrayToTree } from '@/utils'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { cloneDeep } from 'lodash'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'

const AuthPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (
    type: 'delete',
    { id, children }: AuthType & { children?: AuthType[] },
  ) => {
    switch (type) {
      case 'delete':
        if (children && children?.length > 0) {
          message.warning('请先删除子节点')
          return Promise.resolve()
        }
        await authService.delete(id)
        break
      default:
        break
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<AuthType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <TriggerAddModal key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
      ],
    },
  ]

  return (
    <Table<AuthType>
      actionRef={actionRef}
      columns={columns}
      search={false}
      rowKey="id"
      request={async () => {
        const { success, data } = await authService.getList()
        const list = arrayToTree<AuthType>(cloneDeep(data))
        return { success, data: list }
      }}
      pagination={false}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          trigger={<Button type="primary">新增权限</Button>}
          onSuccess={refresh}
        />,
      ]}
    />
  )
}

export default AuthPage
