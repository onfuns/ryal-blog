import { roleService, userService } from '@/service'
import {
  ModalForm,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import CryptoJS from 'crypto-js'
import { UserStatus, UserStatusMap } from '../enum'

export const UserAdd = ({ trigger, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()
  const isEdit = !!detail?.id

  const onFinish = async () => {
    const values = await form.validateFields()
    const params = {
      ...values,
      roles: values.roles?.map((id: number) => ({ id })),
    }
    if (isEdit) {
      await userService.update(detail.id, params)
    } else {
      params.password = CryptoJS.MD5(values.password)
      await userService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="用户信息"
      trigger={trigger}
      modalProps={{ onOk: onFinish, onCancel: onClose, destroyOnClose: true }}
      initialValues={{ enable: UserStatus.Enable, ...detail }}
    >
      <ProFormText
        label="用户名"
        name="name"
        rules={[{ required: true }]}
        placeholder="请输入用户名"
      />

      {!isEdit && (
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
        convertValue={value => value?.map((role: any) => role.id)}
        request={async () => {
          const { data } = await roleService.getList()
          return data?.map((item: any) => ({ label: item.name, value: item.id }))
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
