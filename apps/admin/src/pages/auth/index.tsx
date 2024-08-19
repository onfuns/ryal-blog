import { authService, type AuthType } from '@/service'
import { toTree } from '@/utils'
import { Table, TableActionType, TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, message } from 'antd'
import { cloneDeep } from 'lodash'
import { useRef, useState } from 'react'
import { AuthAdd } from './components/Add'

const AuthPage = () => {
  const actionRef = useRef<TableActionType>()
  const [expandKeys, setExpandKeys] = useState<number[]>([])

  const onDelete = async ({ children, id }: AuthType & { children?: AuthType[] }) => {
    if (children && children?.length > 0) {
      message.warning('请先删除子节点')
      return Promise.resolve()
    }
    await authService.delete(id)
    message.success('操作成功')
    onRoload()
  }

  const onRoload = () => actionRef?.current?.reload()

  const columns: TableColumns<AuthType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => (
        <span style={{ fontFamily: '"Source Sans Pro",Calibri,Candara,Arial,sans-serif' }}>
          {record.pid !== 0 ? `   ├─   ${record.name}` : record.name}
        </span>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <AuthAdd detail={record} onSuccess={onRoload} trigger={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record)}>
              <a className="a-danger">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <Table<AuthType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="权限列表"
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
        return { success, data: toTree(cloneDeep(data)) }
      }}
      pagination={false}
      toolBarRender={() => [
        <AuthAdd
          onSuccess={onRoload}
          key="add"
          trigger={<Button type="primary">新增权限</Button>}
        />,
      ]}
    />
  )
}

export default AuthPage
