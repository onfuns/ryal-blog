import {
  ArticleCommentStatusEnumType,
  ArticlePassStatusEnumType,
  articleService,
  categoryService,
  tagService,
} from '@/service'
import {
  DrawerForm,
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { MarkdownEditor, RichTextEditor, TimeFormt } from '@ryal/ui-kit'
import { message } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { CatetoryIdEnum } from '../../category/enum'

export const ArticleAdd = ({ trigger, onCancel, onSuccess, detail = {} }: IDetailModalProps) => {
  const [content, setContent] = useState('')
  const [formInstance] = ProForm.useForm()
  const isEditMode = !!detail?.id

  const loadData = async () => {
    const { data: article } = await articleService.info(detail.id)
    const { publish_time, category, tags, content } = article
    setContent(content)
    formInstance.setFieldsValue({
      ...article,
      publish_time: dayjs(publish_time),
      tags: tags?.map(item => item.id),
      category_id:
        category?.pid === CatetoryIdEnum.Root ? [category.id] : [category.pid, category.id],
    })
  }

  useEffect(() => {
    if (isEditMode) {
      loadData()
    }
  }, [detail])

  const onFinish = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      publish_time: values.publish_time
        ? dayjs(values.publish_time).format(TimeFormt.Time)
        : undefined,
      category_id: values?.category_id?.pop(),
      tags: values?.tags?.map((id: number) => ({ id })),
      content,
    }

    if (isEditMode) {
      await articleService.update(detail.id, params)
    } else {
      await articleService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <DrawerForm
      title="文章信息"
      trigger={trigger}
      drawerProps={{ onClose: onCancel }}
      onFinish={onFinish}
      width="80%"
      form={formInstance}
      initialValues={{
        pass_status: ArticlePassStatusEnumType.Audited,
        comment_status: ArticleCommentStatusEnumType.Closed,
        publish_time: dayjs(),
        editor_type: 'markdown',
      }}
    >
      <ProFormText
        label="标题"
        name="title"
        rules={[{ required: true }]}
        placeholder="请输入标题"
      />

      <ProFormTextArea
        label="摘要"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入摘要"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProFormCascader
        label="分类"
        name="category_id"
        rules={[{ required: true }]}
        placeholder="请选择分类"
        request={async () => {
          const { data } = await categoryService.getList()
          return data?.map(item => ({ label: item.name, value: item.id }))
        }}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          changeOnSelect: true,
        }}
      />

      <ProFormSelect
        label="标签"
        name="tags"
        rules={[{ required: true }]}
        placeholder="请选择标签"
        mode="multiple"
        request={async () => {
          const { data } = await tagService.getList({ current: 1, pageSize: 100 })
          return (data?.list || [])?.map(item => ({ label: item.name, value: item.id }))
        }}
      />

      <ProFormRadio.Group
        label="审核"
        name="pass_status"
        options={[
          { label: '通过', value: ArticlePassStatusEnumType.Audited },
          { label: '待审核', value: ArticlePassStatusEnumType.UnAudited },
        ]}
      />

      <ProFormRadio.Group
        label="开放评论"
        name="comment_status"
        options={[
          { label: '是', value: ArticleCommentStatusEnumType.Opened },
          { label: '否', value: ArticleCommentStatusEnumType.Closed },
        ]}
      />

      <ProFormDatePicker
        label="发布时间"
        name="publish_time"
        rules={[{ required: true }]}
        dataFormat={TimeFormt.Time}
        fieldProps={{ showTime: true }}
        allowClear
      />

      <ProFormText
        label="作者"
        name="author"
        rules={[{ required: true }]}
        placeholder="请输入作者"
      />

      <ProForm.Item label="内容">
        <ProFormRadio.Group
          label="编辑器类型"
          name="editor_type"
          options={[
            { label: 'markdown', value: 'markdown' },
            { label: 'text', value: 'text' },
          ]}
        />

        <ProFormDependency name={['editor_type']}>
          {({ editor_type }) => {
            return (
              <>
                <MarkdownEditor
                  className={editor_type === 'text' ? 'hidden' : ''}
                  value={content}
                  onChange={value => setContent(value)}
                />
                <RichTextEditor
                  className={editor_type === 'markdown' ? 'hidden' : ''}
                  editor={{ value: content, onChange: editor => setContent(editor.getHtml()) }}
                />
              </>
            )
          }}
        </ProFormDependency>
      </ProForm.Item>
    </DrawerForm>
  )
}
