import { commentService, type CommentType } from '@/service'
import { IDetailModalProps } from '@/type'
import { ProForm, ProFormTextArea } from '@ant-design/pro-components'
import { ModalForm, TriggerModal } from '@ryal/ui-kit'
import { message } from 'antd'
import { useEffect } from 'react'

export const CommentAdd = ({ onSuccess, onCancel, detail }: IDetailModalProps<CommentType>) => {
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
    <ModalForm title="评论信息" open={true} modalProps={{ onCancel, onOk }} form={formInstance}>
      <ProFormTextArea
        label="回复内容"
        name="reply"
        placeholder="请输入回复内容"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
    </ModalForm>
  )
}

export const TriggerAddModal = (props: IDetailModalProps<CommentType>) => (
  <TriggerModal
    trigger={props?.trigger}
    component={({ setOpen }) => (
      <CommentAdd
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
