import {
  ArticleCommentStatusEnumType,
  ArticleEditorTypeEnumType,
  ArticlePassStatusEnumType,
  ArticleType,
  articleService,
  categoryService,
  tagService,
} from '@/service'
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { DrawerForm, MarkdownEditor, RichTextEditor, TimeFormt } from '@ryal/ui-kit'
import { useSetState } from 'ahooks'
import { message } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { CatetoryIdEnum } from '../../category/enum'

export const ArticleAdd = ({
  trigger,
  onCancel,
  onSuccess,
  detail,
}: IDetailModalProps<ArticleType>) => {
  const [editorValues, setEditorValues] = useSetState({ markdownContent: '', richTextContent: '' })
  const [formInstance] = ProForm.useForm<
    ArticleType & { categoryIds?: number[]; tagIds: number[] }
  >()
  const isEditMode = !!detail?.id

  const setFormData = async () => {
    if (!detail?.id) return false
    const { data: article } = await articleService.info(detail.id)
    const { publish_time, category, tags, content, editor_type } = article

    if (editor_type === ArticleEditorTypeEnumType.Markdown) {
      setEditorValues({ markdownContent: content })
    } else {
      setEditorValues({ richTextContent: content })
    }
    formInstance.setFieldsValue({
      ...article,
      publish_time: dayjs(publish_time).toString(),
      tagIds: tags?.map(item => item.id),
      categoryIds:
        category?.pid === CatetoryIdEnum.Root ? [category.id] : [category.pid, category.id],
    })
  }

  useEffect(() => {
    if (isEditMode) {
      setFormData()
    }
  }, [detail])

  const onOk = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      publish_time: values.publish_time
        ? dayjs(values.publish_time).format(TimeFormt.Time)
        : undefined,
      category_id: values?.categoryIds?.pop(),
      tagIds: values?.tagIds?.map((id: number) => ({ id })),
      content:
        values?.editor_type === ArticleEditorTypeEnumType.Markdown
          ? editorValues?.markdownContent
          : editorValues.richTextContent,
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
    <DrawerForm<ArticleType>
      title="文章信息"
      trigger={trigger}
      drawerProps={{ onCancel, onOk }}
      width="60%"
      form={formInstance}
      initialValues={{
        pass_status: ArticlePassStatusEnumType.Audited,
        comment_status: ArticleCommentStatusEnumType.Closed,
        publish_time: dayjs(),
        editor_type: ArticleEditorTypeEnumType.Markdown,
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
        name="categoryIds"
        rules={[{ required: true }]}
        placeholder="请选择分类"
        request={() => categoryService.getList() as Promise<any>}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          changeOnSelect: true,
        }}
      />

      <ProFormSelect
        label="标签"
        name="tagIds"
        rules={[{ required: true }]}
        placeholder="请选择标签"
        mode="multiple"
        request={() => tagService.getList({ current: 1, pageSize: 100 }) as Promise<any>}
        fieldProps={{ fieldNames: { label: 'name', value: 'id' } }}
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
          name="editor_type"
          options={[
            { label: 'markdown', value: ArticleEditorTypeEnumType.Markdown },
            { label: '富文本', value: ArticleEditorTypeEnumType.Text },
          ]}
        />

        <ProFormDependency name={['editor_type']}>
          {({ editor_type }) => {
            return (
              <>
                <MarkdownEditor
                  className={classNames({ hidden: editor_type === ArticleEditorTypeEnumType.Text })}
                  value={editorValues.markdownContent}
                  onChange={value => setEditorValues({ markdownContent: value })}
                />
                <RichTextEditor
                  className={classNames({
                    hidden: editor_type === ArticleEditorTypeEnumType.Markdown,
                  })}
                  editor={{
                    value: editorValues.richTextContent,
                    onChange: editor => setEditorValues({ richTextContent: editor.getHtml() }),
                  }}
                />
              </>
            )
          }}
        </ProFormDependency>
      </ProForm.Item>
    </DrawerForm>
  )
}
