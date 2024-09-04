import { tagService, type TagType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'

const TagPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete', { id }: TagType) => {
    switch (type) {
      case 'delete':
        await tagService.delete(id)
        break
      default:
        break
    }
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
        <TriggerAddModal key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
      ],
    },
  ]

  return (
    <Table<TagType>
      actionRef={actionRef}
      columns={columns}
      search={false}
      rowKey="id"
      request={tagService.getList}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增标签</Button>}
        />,
      ]}
    />
  )
}

export default TagPage
