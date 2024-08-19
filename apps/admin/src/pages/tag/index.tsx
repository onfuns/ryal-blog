import { tagService, type TagType } from '@/service'
import { Table, TableActionType, TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, message } from 'antd'
import { useRef } from 'react'
import { TagAdd } from './components/Add'

const TagPage = () => {
  const actionRef = useRef<TableActionType>()

  const onDelete = async (id: TagType['id']) => {
    await tagService.delete(id)
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current?.reload()

  const columns: TableColumns<TagType>[] = [
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
            <TagAdd detail={record} onSuccess={onReload} trigger={<a>编辑</a>} />
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(record.id)}>
              <a className="a-danger">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <Table<TagType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="标签列表"
      search={false}
      rowKey="id"
      request={async (params = {}) => {
        return tagService.getList({ ...params })
      }}
      pagination={false}
      toolBarRender={() => [
        <TagAdd
          key="add"
          onSuccess={onReload}
          trigger={<Button type="primary">新增标签</Button>}
        />,
      ]}
    />
  )
}

export default TagPage
