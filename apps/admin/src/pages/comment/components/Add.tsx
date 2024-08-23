import { commentService } from '@/service'
import { ProForm, ProFormTextArea } from '@ant-design/pro-components'
import { ModalForm } from '@ryal/ui-kit'
import { message } from 'antd'
import { useEffect } from 'react'

export const CommentAdd = ({ trigger, onSuccess, onCancel, detail }: IDetailModalProps) => {
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
      await commentService.update(detail.id, values)
    }
    message.success('操作成功')
    onSuccess?.()
    return true
  }

  return (
    <ModalForm
      title="评论信息"
      trigger={trigger}
      modalProps={{ onCancel, onOk }}
      form={formInstance}
    >
      <ProFormTextArea
        label="回复内容"
        name="reply"
        placeholder="请输入回复内容"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
    </ModalForm>
  )
}
