import { ArticlePassStatusEnumType, articleService, type ArticleType } from '@/service'
import { Table, TableDelete, Time, type TableActionType, type TableColumns } from '@ryal/ui-kit'
import { Button, Switch, message } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { ArticleAdd } from './components/Add'
import { DataActionType, SortTypeEnum } from './enum'

const ArticlePage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: DataActionType, record: Partial<ArticleType>) => {
    const { id, sort, pass_status } = record || {}
    if (!id) return false
    if (type === DataActionType.Delete) {
      await articleService.delete(id)
    } else if (type === DataActionType.Sort) {
      // > 0 说明取消置顶
      const sortValue = Number(sort) > 0 ? 0 : dayjs().valueOf()
      await articleService.update(id, { sort: sortValue })
    } else if (type === DataActionType.Pass) {
      let passStatus = undefined
      if (pass_status === ArticlePassStatusEnumType.Audited) {
        passStatus = ArticlePassStatusEnumType.UnAudited
      } else {
        passStatus = ArticlePassStatusEnumType.Audited
      }
      await articleService.update(id, { pass_status: passStatus })
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<ArticleType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 250,
      render: (_, { id, title }) => (
        <a target="_blank" rel="noreferrer" href={`/article/${id}`}>
          {title}
        </a>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      hideInSearch: true,
      render: (_, { category }) => category?.name,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInSearch: true,
      render: (_, { tags }) => tags?.map(({ name }: any) => name).join(','),
    },
    {
      title: '发布时间',
      hideInSearch: true,
      dataIndex: 'publish_time',
      render: (_, { publish_time }) => <Time type="time" value={publish_time} />,
    },
    {
      title: '是否置顶',
      dataIndex: 'sort',
      valueEnum: {
        [SortTypeEnum.Top]: '是',
        [SortTypeEnum.UnTop]: '否',
      },
      width: 100,
      render: (_, { id, sort }) => (
        <Switch
          checked={sort > 0}
          onChange={() => onAction(DataActionType.Sort, { id, sort })}
          size="small"
        />
      ),
    },
    {
      title: '审核',
      dataIndex: 'pass_status',
      valueEnum: {
        [ArticlePassStatusEnumType.Audited]: '已审核',
        [ArticlePassStatusEnumType.UnAudited]: '未审核',
      },
      width: 100,
      render: (_, { id, pass_status }) => (
        <Switch
          checked={pass_status === ArticlePassStatusEnumType.Audited}
          onChange={() => onAction(DataActionType.Pass, { id, pass_status })}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <ArticleAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        <TableDelete
          key="delete"
          onDelete={() => onAction(DataActionType.Delete, { id: record.id })}
        />,
      ],
    },
  ]

  const requestTableData = async (params = {}) => {
    const { success, data } = await articleService.getList({ ...params })
    return { success, ...data }
  }

  return (
    <Table<ArticleType>
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={requestTableData}
      scroll={{ x: '100%' }}
      toolBarRender={() => [
        <ArticleAdd
          key="add"
          onSuccess={refresh}
          trigger={
            <Button key="add" type="primary">
              新增文章
            </Button>
          }
        />,
      ]}
    />
  )
}

export default ArticlePage
