import { fileService, type FileType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, Popover, message } from 'antd'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'

const FilePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete', { id }: FileType) => {
    switch (type) {
      case 'delete':
        await fileService.delete(id)
        break
      default:
        break
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<FileType>[] = [
    {
      title: '原始名称',
      dataIndex: 'originalname',
      width: 150,
      ellipsis: true,
    },
    {
      title: '分组',
      dataIndex: 'fileCategoryId',
      render: (_, { fileCategory }) => fileCategory?.name,
    },
    {
      title: '链接',
      dataIndex: 'url',
      hideInSearch: true,
      width: 300,
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'image',
      hideInSearch: true,
      render: (_, { url }) => (
        <Popover
          placement="left"
          title={null}
          content={<img src={`/${url}`} style={{ maxWidth: 500 }} />}
        >
          <img src={`/${url}`} width={30} />
        </Popover>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a key="download" target="_blank" rel="noreferrer" href={`/${record?.url}`}>
          下载
        </a>,
        <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
      ],
    },
  ]

  return (
    <Table<FileType>
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={fileService.getList}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">上传文件</Button>}
        />,
      ]}
    />
  )
}

export default FilePage
