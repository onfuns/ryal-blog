import { deleteArticle, updateArticle } from '@/actions'
import { Article, type ArticleType } from '@ryal/api'
import { Table, Time, type TableActionType, type TableColumns, type TableProps } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, Switch, message } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { ArticleAdd } from './components/Add'

enum DataActionType {
  /** 置顶 */
  Sort = 'sort',
  /**  审核 */
  Pass = 'pass',
  /** 删除 */
  Delete = 'delete',
}

export default function ArticlePage() {
  const actionRef = useRef<TableActionType>()
  const articleService = new Article()

  const onAction = async (
    type: DataActionType,
    record: { id: string; sort?: number; pass_flag?: number },
  ) => {
    const { id, sort = 0, pass_flag = 0 } = record || {}
    if (type === DataActionType.Delete) {
      await deleteArticle(id)
    } else if (type === DataActionType.Sort) {
      // > 0 说明取消置顶
      await updateArticle(id, { sort: Number(sort) > 0 ? 0 : dayjs().valueOf() })
    } else if (type === DataActionType.Pass) {
      //审核
      await updateArticle(id, { pass_flag: Number(!pass_flag) })
    }
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current?.reload()

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
      title: '置顶',
      dataIndex: 'sort',
      valueEnum: {
        1: '是',
        0: '否',
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
      dataIndex: 'pass_flag',
      valueEnum: {
        1: '已审核',
        2: '未审核',
      },
      width: 100,
      render: (_, { id, pass_flag }) => (
        <Switch
          checked={pass_flag === 1}
          onChange={() => onAction(DataActionType.Pass, { id, pass_flag })}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <Space>
          <ArticleAdd detail={record} onSuccess={onReload} trigger={<a>编辑</a>} />
          <Popconfirm
            title="确定删除？"
            onConfirm={() => onAction(DataActionType.Delete, { id: record.id })}
          >
            <a className="a-danger">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const requestTableData = async (params = {}) => {
    const { success, data } = await articleService.articleFindAll({ ...params })
    return { success, data: data?.list, total: data?.count }
  }

  const tableProps: TableProps<any, any> = {
    actionRef,
    columns,
    rowKey: 'id',
    request: requestTableData,
    scroll: { x: '100%' },
    toolBarRender: () => [
      <ArticleAdd
        key="add"
        onSuccess={onReload}
        trigger={
          <Button key="add" type="primary">
            新建文章
          </Button>
        }
      />,
    ],
  }

  return <Table {...tableProps} />
}
