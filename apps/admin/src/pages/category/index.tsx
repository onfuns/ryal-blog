import {
  CategoryListItemDtoType,
  CategoryStatusEnumType,
  CategoryTypeEnumType,
  categoryService,
} from '@/service'
import { Table, TableActionType, TableColumns, TableDelete } from '@ryal/ui-kit'
import { Button, Tag, message } from 'antd'
import { useRef, useState } from 'react'
import { CategoryAdd } from './components/Add'
import { CategoryStatusMap, CategoryTypeMap } from './enum'

const CategoryPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()
  const [expandKeys, setExpandKeys] = useState<number[]>([])

  const onAction = async (type: 'delete' | 'status', { id, status }: CategoryListItemDtoType) => {
    if (type === 'delete') {
      await categoryService.delete(id)
    } else if (type === 'status') {
      let statusValue = undefined
      if (status === CategoryStatusEnumType.Enable) {
        statusValue = CategoryStatusEnumType.Block
      } else {
        statusValue = CategoryStatusEnumType.Enable
      }
      await categoryService.update(id, { status: statusValue })
    }
    message.success('操作成功')
    refresh()
  }

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
      render: (_, { type, url }) => {
        const { label } = CategoryTypeMap.find(item => item.value === type) || {}
        return (
          <Tag color="green">
            {label}
            {type === CategoryTypeEnumType.Url && `（${url}）`}
          </Tag>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, { status }) => {
        const { label, color } = CategoryStatusMap.find(item => item.value === status) || {}
        return <Tag color={color}>{label}</Tag>
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <CategoryAdd key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        record.pid === 0 && record?.children?.length ? null : (
          <TableDelete key="delete" onDelete={() => onAction('delete', record)} />
        ),
      ],
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
      request={() => categoryService.getList()}
      pagination={false}
      toolBarRender={() => [
        <CategoryAdd
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增分类</Button>}
        />,
      ]}
    />
  )
}

export default CategoryPage
