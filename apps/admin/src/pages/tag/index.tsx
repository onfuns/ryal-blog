import { tagService, type TagType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { useRef } from 'react'
import { TagAdd } from './components/Add'

const TagPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onDelete = async (id: TagType['id']) => {
    await tagService.delete(id)
    message.success('操作成功')
    refresh()
  }

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
      render: (_, record) => [
        <TagAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onDelete(record.id)} />,
      ],
    },
  ]

  return (
    <Table<TagType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="标签列表"
      search={false}
      rowKey="id"
      request={() => tagService.getList()}
      pagination={false}
      toolBarRender={() => [
        <TagAdd key="add" onSuccess={refresh} trigger={<Button type="primary">新增标签</Button>} />,
      ]}
    />
  )
}

export default TagPage
