import { CategoryListItemType, CategoryTypeEnumType, categoryService } from '@/service'
import { Table, TableActionType, TableColumns, TableDelete, Time } from '@ryal/ui-kit'
import { Button, Tag, message } from 'antd'
import { useRef } from 'react'
import { TriggerAddModal } from './components/Add'
import { CategoryStatusMap, CategoryTypeMap, CatetoryIdEnum } from './enum'

const CategoryPage = () => {
  const actionRef = useRef<TableActionType>()
  const refresh = () => actionRef?.current?.reload()

  const onAction = async (type: 'delete', { id }: CategoryListItemType) => {
    switch (type) {
      case 'delete':
        await categoryService.delete(id)
        break
      default:
        break
    }
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumns<CategoryListItemType>[] = [
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
      title: '栏目',
      dataIndex: 'type',
      render: (_, { type, url }) => {
        const { label } = CategoryTypeMap.find(item => item.value === type) || {}
        return label ? (
          <Tag color="green">
            {label}
            {type === CategoryTypeEnumType.Url && `(${url})`}
          </Tag>
        ) : (
          '-'
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
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      width: 200,
      render: (_, { created_at }) => <Time type="time" value={created_at} />,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <TriggerAddModal key="add" detail={record} onSuccess={refresh} trigger={<a>编辑</a>} />,
        record.pid === CatetoryIdEnum.Root && record?.children?.length ? null : (
          <TableDelete key="delete" onDelete={() => onAction('delete', record)} />
        ),
      ],
    },
  ]

  return (
    <Table<CategoryListItemType>
      actionRef={actionRef}
      columns={columns}
      search={false}
      rowKey="id"
      dataFieldName="data"
      request={categoryService.getList}
      pagination={false}
      toolBarRender={() => [
        <TriggerAddModal
          key="add"
          onSuccess={refresh}
          trigger={<Button type="primary">新增分类</Button>}
        />,
      ]}
    />
  )
}

export default CategoryPage
