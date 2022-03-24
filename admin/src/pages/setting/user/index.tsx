import { useState, useRef } from 'react'
import { Button, Popconfirm, Switch, Space, message } from 'antd'
import AddModal from '@/components/Setting/User/Add'
import { inject, observer } from 'mobx-react'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { UserStore, RoleStore } from '@/store'

interface IModalProps {
  visible?: boolean
  type?: 'add' | 'edit' | undefined
  record?: Record<string, any>
}

const UserList = ({ userStore, roleStore }: { userStore?: UserStore; roleStore?: RoleStore }) => {
  const { result: roleList = [] } = roleStore

  const actionRef = useRef<ActionType>()
  const [modalProps, setModalProps] = useState<IModalProps>({ visible: false })

  const onSetModalProps = (props: IModalProps = {}) => {
    setModalProps({ ...modalProps, visible: !modalProps.visible, ...props })
  }

  const onLoadData = () => {
    actionRef?.current.reload()
  }

  const onAction = async (record: any = {}, type: 'add' | 'edit' | 'delete') => {
    if (type === 'add' || type === 'edit') {
      onSetModalProps({ record, visible: true })
    } else if (type === 'delete') {
      const { success } = await userStore.delete({ id: record.id })
      if (success) {
        message.success('删除成功')
        onLoadData()
      }
    }
  }

  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      render: (value: string) => {
        //TODO 暂不支持多角色
        const { name } = roleList.find(r => r.id === Number(value)) || {}
        return name
      },
    },
    {
      title: '启用状态',
      dataIndex: 'enable',
      render: (value: number) => <Switch checked={value === 1} size="small" />,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" onClick={() => onAction(record, 'edit')}>
              编辑
            </Button>
            {record.pid === 0 && record?.children?.length ? null : (
              <Popconfirm title="确定删除？" onConfirm={() => onAction(record, 'delete')}>
                <Button size="small" danger>
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        bordered={true}
        columns={columns}
        headerTitle="用户列表"
        form={{ autoFocusFirstInput: false }}
        search={false}
        rowKey="id"
        request={async (params = {}) => {
          await userStore.get({ ...params })
          return { success: true, data: userStore.result }
        }}
        pagination={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAction({}, 'add')}>
            新增
          </Button>,
        ]}
        size="small"
      />

      {modalProps.visible && (
        <AddModal
          onSuccess={() => {
            onSetModalProps({ visible: false })
            onLoadData()
          }}
          onCancel={() => onSetModalProps({ visible: false })}
          detail={modalProps.record}
        />
      )}
    </>
  )
}

export default inject('userStore', 'roleStore')(observer(UserList))
