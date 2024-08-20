import { commentService, type CommentType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Switch, message } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { CommentAdd } from './components/Add'

const CommentPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete' | 'pass', { id, status }: CommentType) => {
    if (type === 'delete') {
      await commentService.delete(id)
    } else if (type === 'pass') {
      await commentService.update(id, { status: Number(!status) })
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<any>[] = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 250,
      ellipsis: true,
      render: (_, { article }) => (
        <a href={`/article/${article?.id}`} target="_blank" rel="noreferrer">
          {article?.title}
        </a>
      ),
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '评论人',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '站点',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title: '回复内容',
      dataIndex: 'reply',
      hideInSearch: true,
    },
    {
      title: '评论时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      render: (_, { created_at }) => created_at && dayjs(created_at).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '审核',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction('pass', record)}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <CommentAdd key="add" detail={record} trigger={<a>回复</a>} />,
        <TableDelete key="delete" onDelete={() => onAction('delete', record)} />,
      ],
    },
  ]

  return (
    <Table<CommentType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="评论列表"
      rowKey="id"
      request={async params => {
        const { success, data } = await commentService.getList(params)
        return { success, data: data?.list || [], total: data?.total }
      }}
    />
  )
}

export default CommentPage
