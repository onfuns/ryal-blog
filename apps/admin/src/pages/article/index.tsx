import { ArticlePassStatusEnumType, articleService, type ArticleType } from '@/service'
import { Table, TableDelete, Time, type TableActionType, type TableColumns } from '@ryal/ui-kit'
import { Button, Switch, Tag, message } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'
import { SortTypeEnum } from './enum'

const ArticlePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (
    type: 'delete' | 'sort' | 'pass',
    { id, sort, pass_status }: Partial<ArticleType>,
  ) => {
    if (!id) return false
    switch (type) {
      case 'delete':
        await articleService.delete(id)
        break
      case 'sort':
        // > 0 说明取消置顶
        const sortValue = Number(sort) > 0 ? 0 : dayjs().valueOf()
        await articleService.update(id, { sort: sortValue })
        break
      case 'pass':
        const passStatus =
          pass_status === ArticlePassStatusEnumType.Audited
            ? ArticlePassStatusEnumType.UnAudited
            : ArticlePassStatusEnumType.Audited
        await articleService.update(id, { pass_status: passStatus })
        break
      default:
        break
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<ArticleType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      fixed: 'left',
      width: 200,
      render: (_, { id, title }) => (
        <a className="text-12!" target="_blank" rel="noreferrer" href={`/article/${id}`}>
          {title}
        </a>
      ),
    },
    {
      title: '栏目',
      dataIndex: 'category',
      hideInSearch: true,
      width: 100,
      render: (_, { category }) => category?.name,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInSearch: true,
      width: 120,
      render: (_, { tags }) =>
        tags?.map(({ name }) => (
          <Tag key={name} color="orange">
            {name}
          </Tag>
        )),
    },
    {
      title: '置顶状态',
      dataIndex: 'sort',
      valueEnum: {
        [SortTypeEnum.Top]: '是',
        [SortTypeEnum.UnTop]: '否',
      },
      width: 80,
      render: (_, { id, sort }) => (
        <Switch checked={sort > 0} onChange={() => onAction('sort', { id, sort })} size="small" />
      ),
    },
    {
      title: '审核状态',
      dataIndex: 'pass_status',
      valueEnum: {
        [ArticlePassStatusEnumType.Audited]: '已审核',
        [ArticlePassStatusEnumType.UnAudited]: '未审核',
      },
      width: 80,
      render: (_, { id, pass_status }) => (
        <Switch
          checked={pass_status === ArticlePassStatusEnumType.Audited}
          onChange={() => onAction('pass', { id, pass_status })}
          size="small"
        />
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      hideInSearch: true,
      width: 100,
      render: (_, { publish_time }) => <Time type="time" value={publish_time} />,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      width: 100,
      render: (_, { created_at }) => <Time type="time" value={created_at} />,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      hideInSearch: true,
      width: 100,
      render: (_, { updated_at }) => <Time type="time" value={updated_at} />,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record) => [
        <TriggerAddModal key="edit" trigger={<a>编辑</a>} detail={record} />,
        <TableDelete key="delete" onDelete={() => onAction('delete', { id: record.id })} />,
      ],
    },
  ]

  return (
    <Table<ArticleType>
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={articleService.getList}
      scroll={{ x: '100%' }}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          trigger={<Button type="primary">新增文章</Button>}
          onSuccess={refresh}
        />,
      ]}
    />
  )
}

export default ArticlePage
