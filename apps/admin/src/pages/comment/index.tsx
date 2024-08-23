import { CommentStatusEnumType, commentService, type CommentType } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete, Time } from '@ryal/ui-kit'
import { Switch, message } from 'antd'
import { useRef } from 'react'
import { CommentAdd } from './components/Add'

const CommentPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete' | 'pass', { id, status }: CommentType) => {
    switch (type) {
      case 'delete':
        await commentService.delete(id)
        break
      case 'pass':
        const statusValue =
          status === CommentStatusEnumType.Passed
            ? CommentStatusEnumType.UnAudited
            : CommentStatusEnumType.Passed
        await commentService.update(id, { status: statusValue })
        break
      default:
        break
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
      title: '用户',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '用户站点',
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
      render: (_, { created_at }) => <Time value={created_at} type="time" />,
    },
    {
      title: '审核',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.status === CommentStatusEnumType.Passed}
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
      rowKey="id"
      request={commentService.getList}
    />
  )
}

export default CommentPage
