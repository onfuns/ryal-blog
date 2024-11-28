import { useStore } from '@/hooks'
import { type CommentType } from '@/service'
import { Time } from '@ryal/ui-kit'
import { Button, Form, Input, message } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import './index.less'

const Avatar = () => (
  <img
    className="mr-16 rd-50%"
    src="https://picsum.photos/200/200"
    width={40}
    height={40}
    alt="头像"
  />
)

const Comment = ({ articeId }: { articeId: string }) => {
  const { commentStore } = useStore()
  const { listData } = commentStore
  const [formInstance] = Form.useForm()

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
      <div className="flex color-#999 py-10" key={index}>
        <Avatar />
        <div className="flex-1">
          <div className="flex items-center justify-between  mb-10">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-16 color-#333 max-w-130 text-ellipsis-line-1 mb-0"
            >
              {item.name}
            </a>
            <Time value={item.created_at} type="time" />
          </div>
          <p>{item.content}</p>
          {item.reply && <div className="p-16 bg-#f7f8fab3 rd-4">回复：{item.reply}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="component-list w-720 bg-#fff p-20 mt-20 rd-4'">
      <div className="text-18 lh-30 fw-600 color-#999 mb-10">评论</div>
      <div className="flex items-start">
        <Avatar />
        <Form className="flex-[1-1-auto] relative" form={formInstance} colon={false}>
          <div className="flex gap-16">
            <Form.Item name="name" rules={[{ required: true, message: '请输入昵称' }]}>
              <Input maxLength={10} placeholder="请输入昵称" />
            </Form.Item>

            <Form.Item name="url" rules={[{ required: true, message: '请输入站点地址' }]}>
              <Input maxLength={300} placeholder="请输入站点地址" />
            </Form.Item>
          </div>

          <Form.Item name="content" rules={[{ required: true, message: '请输入回复内容' }]}>
            <Input.TextArea
              maxLength={200}
              style={{ minHeight: 100, maxHeight: 150 }}
              placeholder="请输入回复内容"
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button type="primary" onClick={onSubmit}>
              立即评论
            </Button>
            <span className="color-#999 ml-5">请文明评论哦~</span>
          </Form.Item>
        </Form>
      </div>

      {!!listData?.data?.length && (
        <div className="mt-20">
          <div className="text-18 lh-30 fw-600 color-#999 mb-10">全部评论</div>
          <div>{listData?.data?.map(renderItem)}</div>
        </div>
      )}
    </div>
  )
}

export default observer(Comment)
