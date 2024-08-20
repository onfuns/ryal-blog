import { fileService, type FileType } from '@/service'
import { Table, TableActionType, TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Popover, Space, message } from 'antd'
import { useRef } from 'react'
import { FileAdd } from './components/Add'

const FilePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onDelete = async (id: FileType['id']) => {
    await fileService.delete(id)
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
      request: async () => {
        const { data } = await fileService.getFileCategoryList()
        return data?.map(d => ({
          label: d.name,
          value: d.id,
        }))
      },
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
      render: (_, { id, url }) => {
        return (
          <Space>
            <a target="_blank" rel="noreferrer" href={`/${url}`}>
              下载
            </a>
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(id)}>
              <a className="color-red">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <Table<FileType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="附件列表"
      rowKey="id"
      request={async (params = {}) => {
        const { success, data } = await fileService.getList({ ...params })
        return { success, data: data.list, total: data.total }
      }}
      toolBarRender={() => [
        <FileAdd
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">上传文件</Button>}
        />,
      ]}
    />
  )
}

export default FilePage
