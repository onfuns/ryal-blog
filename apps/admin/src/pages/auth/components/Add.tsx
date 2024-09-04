import { AuthNodeTypeEnumType, authService, type AuthType } from '@/service'
import { IDetailModalProps } from '@/type'
import { arrayToTree } from '@/utils'
import { ProForm, ProFormCascader, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { ModalForm, TriggerModal } from '@ryal/ui-kit'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { AuthIdEnum, AuthNodeTypeMap } from '../enum'

export const AuthAdd = ({ onSuccess, onCancel, detail }: IDetailModalProps<AuthType>) => {
  const [formInstance] = ProForm.useForm()
  const { data } = useRequest(authService.getList)
  const authList = data?.data || []
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      const pid = detail.pid ? findAllPid(detail.id) : undefined
      formInstance.setFieldsValue({ ...detail, pid })
    }
  }, [detail])

  const findAllPid = (id: number, result: any[] = []): number[] => {
    const current = authList?.find(auth => auth.id === id)
    result.push(id)
    if (current && current.pid !== AuthIdEnum.Root) {
      return findAllPid(current.pid, result)
    }
    //只查出父级ID，不包含自己
    result.reverse()
    result.pop()
    return result
  }

  const onOk = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      pid: values.pid.pop(),
    }
    if (isEditMode) {
      await authService.update(detail.id, params)
    } else {
      await authService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
    return true
  }

  const menuList = [{ id: AuthIdEnum.Root, name: '一级菜单' }].concat(
    authList.filter(auth => auth.node_type === AuthNodeTypeEnumType.Menu),
  )

  return (
    <ModalForm
      title={`${isEditMode ? '编辑' : '新增'}权限`}
      open={true}
      modalProps={{ onCancel, onOk }}
      form={formInstance}
      initialValues={{ node_type: AuthNodeTypeEnumType.Menu }}
    >
      <ProFormRadio.Group
        label="类型"
        name="node_type"
        rules={[{ required: true }]}
        options={AuthNodeTypeMap}
      />

      <ProFormCascader
        label="所属菜单"
        name="pid"
        rules={[{ required: true }]}
        placeholder="请选择所属菜单"
        allowClear={false}
        fieldProps={{
          options: arrayToTree(menuList),
          changeOnSelect: true,
          fieldNames: { label: 'name', value: 'id', children: 'children' },
        }}
      />

      <ProFormText label="名称" name="name" rules={[{ required: true }]} />

      <ProFormText
        label="编码"
        name="code"
        rules={[{ required: true }]}
        extra="唯一性，带/前缀的 页面或接口路径，可用英文逗号分割"
      />
    </ModalForm>
  )
}

export const TriggerAddModal = (props: IDetailModalProps<AuthType>) => (
  <TriggerModal
    trigger={props?.trigger}
    component={({ setOpen }) => (
      <AuthAdd
        detail={props?.detail}
        onSuccess={() => {
          props?.onSuccess?.()
          setOpen(false)
        }}
        onCancel={() => {
          props?.onCancel?.()
          setOpen(false)
        }}
      />
    )}
  />
)
