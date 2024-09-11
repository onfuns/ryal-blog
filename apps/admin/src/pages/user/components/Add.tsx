import { roleService, userService, UserStatusEnumType, type UserType } from '@/service'
import { IDetailModalProps } from '@/type'
import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { ModalForm, TriggerModal } from '@ryal/ui-kit'
import { message } from 'antd'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { UserStatusMap } from '../enum'

export const UserAdd = ({ onSuccess, onCancel, detail }: IDetailModalProps<UserType>) => {
  const [formInstance] = ProForm.useForm()
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      const roleIds = detail.roles?.map(role => role.id)
      formInstance.setFieldsValue({ ...detail, roleIds })
    }
  }, [detail])

  const onOk = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      roles: values.roleIds?.map((id: number) => ({ id })),
    }
    if (isEditMode) {
      await userService.update(detail.id, params)
    } else {
      params.password = CryptoJS.MD5(values.password).toString()
      await userService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
    return true
  }

  return (
    <ModalForm
      title="用户信息"
      open={true}
      modalProps={{ onCancel, onOk }}
      form={formInstance}
      initialValues={{ enable: UserStatusEnumType.Enable }}
    >
      <ProFormText
        label="用户名"
        name="name"
        rules={[{ required: true }]}
        placeholder="请输入用户名"
      />

      {!isEditMode && (
        <ProFormText.Password
          label="密码"
          name="password"
          rules={[{ required: true }]}
          placeholder="请输入密码"
        />
      )}

      <ProFormSelect
        label="所属角色"
        name="roleIds"
        rules={[{ required: true }]}
        placeholder="请选择角色"
        mode="multiple"
        fieldProps={{ fieldNames: { label: 'name', value: 'id' } }}
        request={async () => {
          const { data } = await roleService.getList({ current: 1, pageSize: 100 })
          return data?.data || []
        }}
      />

      <ProFormRadio.Group
        label="状态"
        name="enable"
        rules={[{ required: true }]}
        options={UserStatusMap}
      />
    </ModalForm>
  )
}

export const TriggerAddModal = (props: IDetailModalProps<UserType>) => (
  <TriggerModal
    trigger={props?.trigger}
    component={({ setOpen }) => (
      <UserAdd
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
