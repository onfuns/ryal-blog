import { useStore } from '@/hooks'
import { type CommentType } from '@/service'
import { ProForm, ProFormItem, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Time } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import Image from 'next/image'
import { useEffect } from 'react'
import './index.less'

const Avatar = () => (
  <Image
    className="mr-16  border-r-50%"
    src="/images/avatar.png"
    width={40}
    height={40}
    alt="头像"
  />
)

const Comment = ({ articeId }: { articeId: string }) => {
  const { commentStore } = useStore()
  const { result } = commentStore
  const [formInstance] = ProForm.useForm()

  useEffect(() => {
    if (articeId) {
      commentStore.get({ aid: articeId })
    }
  }, [articeId])

  const onSubmit = async () => {
    const values = await formInstance.validateFields()
    const { success } = await commentStore.add({ ...values, aid: articeId })
    if (success) {
      message.success('评论成功，请耐心等待审核哦~')
      formInstance.resetFields()
    } else {
      message.error('失败啦，歇会儿再试吧~')
    }
  }

  const renderItem = (item: CommentType, index: number) => {
    return (
      <div className="flex color-#515767 py-10" key={index}>
        <Avatar />
        <div className="flex-1">
          <div className="flex items-center justify-between  mb-10">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="fw-500 text-15 color-#252933 max-w-130 lh-26 overflow-hidden text-ellipsis mb-0"
            >
              {item.name}
            </a>
            <Time className="color-#8a919f" value={item.created_at} type="time" />
          </div>
          <p>{item.content}</p>
          {item.reply && <div className="p-16 bg-#f7f8fab3 rd-4">回复：{item.reply}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="component-list w-720 bg-#fff p-20 mt-20 rd-4'">
      <div className="text-18 lh-30 fw-600 color-#252933 mb-10">评论</div>
      <div className="flex items-start">
        <Avatar />
        <ProForm
          className="flex-[1-1-auto] relative"
          form={formInstance}
          colon={false}
          submitter={false}
        >
          <div className="flex gap-16">
            <ProFormText
              name="name"
              rules={[{ required: true, message: '请输入昵称' }]}
              fieldProps={{ maxLength: 10 }}
              placeholder="请输入昵称"
            />
            <ProFormText
              name="url"
              rules={[{ required: true, message: '请输入站点' }]}
              fieldProps={{ maxLength: 300 }}
              placeholder="请输入站点"
            />
          </div>

          <ProFormTextArea
            name="content"
            rules={[{ required: true, message: '请输入回复内容' }]}
            placeholder="请输入回复内容"
            fieldProps={{
              style: { minHeight: 100, maxHeight: 150 },
              maxLength: 200,
            }}
          />

          <ProFormItem noStyle>
            <Button type="primary" onClick={onSubmit}>
              立即评论
            </Button>
            <span className="color-#999">请文明评论哦~</span>
          </ProFormItem>
        </ProForm>
      </div>

      {result?.data?.length > 0 && (
        <div className="mt-20">
          <div className="text-18 lh-30 fw-600 color-#252933 mb-10">全部评论</div>
          <div>{result?.data?.map(renderItem)}</div>
        </div>
      )}
    </div>
  )
}

export default observer(Comment)
