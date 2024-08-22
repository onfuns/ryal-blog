import { tagService } from '@/service'
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { message } from 'antd'
import { useEffect } from 'react'

export const TagAdd = ({ trigger, onSuccess, onCancel, detail = {} }: IDetailModalProps) => {
  const [formInstance] = ProForm.useForm()
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      formInstance.setFieldsValue({ ...detail })
    }
  }, [detail])

  const onOk = async () => {
    const values = await formInstance.validateFields()
    if (isEditMode) {
      await tagService.update(detail.id, values)
    } else {
      await tagService.add(values)
    }
    message.success('操作成功')
    onSuccess?.()
    return true
  }

  return (
    <ModalForm
      title="标签信息"
      trigger={trigger}
      modalProps={{ onCancel }}
      form={formInstance}
      layout="horizontal"
      colon={false}
      labelCol={{ span: 3 }}
      onFinish={onOk}
    >
      <ProFormText label="名称" name="name" rules={[{ required: true }]} placeholder="请输入名称" />

      <ProFormTextArea
        label="描述"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
    </ModalForm>
  )
}
