import { authService, type AuthType } from '@/service'
import { arrayToTree } from '@/utils'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { cloneDeep } from 'lodash'
import { useRef, useState } from 'react'
import { AuthAdd } from './components/Add'
import { AuthIdEnum } from './enum'

const AuthPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()
  const [expandKeys, setExpandKeys] = useState<number[]>([])

  const onDelete = async ({ children, id }: AuthType & { children?: AuthType[] }) => {
    if (children && children?.length > 0) {
      message.warning('请先删除子节点')
      return Promise.resolve()
    }
    await authService.delete(id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<AuthType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => (
        <span style={{ fontFamily: '"Source Sans Pro",Calibri,Candara,Arial,sans-serif' }}>
          {record.pid !== AuthIdEnum.Root ? `   ├─   ${record.name}` : record.name}
        </span>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <AuthAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onDelete(record)} />,
      ],
    },
  ]

  return (
    <Table<AuthType>
      actionRef={actionRef}
      columns={columns}
      search={false}
      expandable={{
        expandedRowKeys: expandKeys,
        onExpand: (expand, { id }) => {
          let newKeys = [...expandKeys]
          if (expand) {
            newKeys.push(id)
          } else {
            newKeys = newKeys.filter(key => key !== id)
          }
          setExpandKeys([...newKeys])
        },
      }}
      rowKey="id"
      onDataSourceChange={data => {
        const keys = data.map(({ id }) => id)
        setExpandKeys(keys)
      }}
      request={async () => {
        const { success, data } = await authService.getList()
        return { success, data: arrayToTree(cloneDeep(data)) }
      }}
      pagination={false}
      toolBarRender={() => [
        <AuthAdd
          onSuccess={refresh}
          key="add"
          trigger={<Button type="primary">新增权限</Button>}
        />,
      ]}
    />
  )
}

export default AuthPage
