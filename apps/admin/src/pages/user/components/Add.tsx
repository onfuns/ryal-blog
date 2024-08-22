import { roleService, userService, UserStatusEnumType } from '@/service'
import {
  ModalForm,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { UserStatusMap } from '../enum'

export const UserAdd = ({ trigger, onSuccess, onCancel, detail }: IDetailModalProps) => {
  const [formInstance] = ProForm.useForm()
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      formInstance.setFieldsValue({ ...detail })
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
  }

  return (
    <ModalForm
      title="用户信息"
      trigger={trigger}
      modalProps={{ onOk, onCancel }}
      initialValues={{ enable: UserStatusEnumType.Enable }}
      form={formInstance}
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
        convertValue={(value: { id: number }[]) => value?.map(role => role.id)}
        request={async () => {
          const { data } = await roleService.getList({ current: 1, pageSize: 100 })
          return (data?.list || [])?.map(item => ({ label: item.name, value: item.id }))
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
