import { commentService } from '@/service'
import { ModalForm, ProForm, ProFormTextArea } from '@ant-design/pro-components'
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
      modalProps={{ onCancel }}
      form={formInstance}
      layout="horizontal"
      colon={false}
      labelCol={{ span: 3 }}
      onFinish={onOk}
    >
      <ProFormTextArea label="回复内容" name="reply" placeholder="请输入回复内容" />
    </ModalForm>
  )
}
