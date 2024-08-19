import { commentService } from '@/service'
import { ModalForm, ProForm, ProFormTextArea } from '@ant-design/pro-components'
import { message } from 'antd'

export const CommentAdd = ({ trigger, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [form] = ProForm.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    await commentService.update(detail.id, values)
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="评论信息"
      trigger={trigger}
      modalProps={{
        destroyOnClose: true,
        onOk: onFinish,
        onCancel: onClose,
      }}
      form={form}
      initialValues={{ reply: detail?.reply }}
    >
      <ProFormTextArea label="回复内容" name="reply" placeholder="请输入回复内容" />
    </ModalForm>
  )
}
