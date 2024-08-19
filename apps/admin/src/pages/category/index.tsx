import { CategoryListItemDtoType, categoryService } from '@/service'
import { Table, TableActionType, TableColumns } from '@ryal/ui-kit'
import { Button, Popconfirm, Space, Switch, Tag, message } from 'antd'
import { useRef, useState } from 'react'
import { CategoryAdd } from './components/Add'

export enum CategoryTypeEnum {
  /** 文章列表 */
  List = 1,
  /** 单页 */
  Page = 2,
  /** 外链 */
  Url = 3,
}

export const CategoryTypeMap: Record<string, string> = {
  [CategoryTypeEnum.List]: '文章列表',
  [CategoryTypeEnum.Page]: '单页',
  [CategoryTypeEnum.Url]: '外链',
}

const CategoryPage = () => {
  const actionRef = useRef<TableActionType>()
  const [expandKeys, setExpandKeys] = useState<number[]>([])

  const onAction = async (type: 'delete' | 'status', { id, status }: CategoryListItemDtoType) => {
    if (type === 'delete') {
      await categoryService.delete(id)
    } else if (type === 'status') {
      await categoryService.update(id, { status: Number(!status) })
    }
    message.success('操作成功')
    onReload()
  }

  const onReload = () => actionRef?.current?.reload()

  const columns: TableColumns<CategoryListItemDtoType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '链接',
      dataIndex: 'ename',
    },
    {
      title: '类别',
      dataIndex: 'type',
      render: (_, { type, url }) => (
        <Tag color="green">
          {CategoryTypeMap[type]}
          {type === CategoryTypeEnum.Url && `（${url}）`}
        </Tag>
      ),
    },
    {
      title: '显示',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => onAction('status', record)}
          size="small"
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <CategoryAdd detail={record} onSuccess={onReload} trigger={<a>编辑</a>} />
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction('delete', record)}>
                <a className="a-danger">删除</a>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <Table<CategoryListItemDtoType>
      actionRef={actionRef}
      columns={columns}
      headerTitle="栏目列表"
      search={false}
      expandable={{
        expandedRowKeys: expandKeys,
        onExpand: (expand, { id }) => {
          let newKeys = [...expandKeys]
          if (expand) {
            newKeys.push(id)
          } else {
            newKeys = newKeys.filter(key => key !== id)
          }
          setExpandKeys([...newKeys])
        },
      }}
      rowKey="id"
      onDataSourceChange={data => setExpandKeys(data.map(({ id }) => id))}
      request={async () => {
        return categoryService.getList()
      }}
      pagination={false}
      toolBarRender={() => [
        <CategoryAdd
          key="add"
          onSuccess={onReload}
          trigger={<Button type="primary">新增分类</Button>}
        />,
      ]}
    />
  )
}

export default CategoryPage
