import { roleService, userService, UserStatusEnumType, type UserType } from '@/service'
import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { ModalForm } from '@ryal/ui-kit'
import { message } from 'antd'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { UserStatusMap } from '../enum'

export const UserAdd = ({ trigger, onSuccess, onCancel, detail }: IDetailModalProps<UserType>) => {
  const [formInstance] = ProForm.useForm()
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      formInstance.setFieldsValue({ ...detail, roles: detail.roles })
    }
  }, [detail])

  const onOk = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      roles: values.roles?.map((id: number) => ({ id })),
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
      trigger={trigger}
      modalProps={{ onCancel, onOk }}
      form={formInstance}
      layout="horizontal"
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
        name="roles"
        rules={[{ required: true }]}
        placeholder="请选择角色"
        mode="multiple"
        request={async () => {
          const { data } = await roleService.getList({ current: 1, pageSize: 100 })
          return (data?.data || [])?.map(item => ({ label: item.name, value: item.id }))
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
