import { ProForm, ProFormItem, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useEffect } from 'react'
import { type PageDetailType } from '../type'

const SeoPage = ({ onSubmit, detail }: PageDetailType) => {
  const [formInstance] = ProForm.useForm()

  useEffect(() => {
    formInstance.setFieldsValue({ ...detail })
  }, [detail])

  return (
    <ProForm labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={formInstance}>
      <ProFormText
        label="SEO 标题"
        name="website_seo_title"
        rules={[{ required: true }]}
        placeholder="请输入 SEO 标题"
      />

      <ProFormText
        label="SEO 关键字"
        name="website_seo_keywords"
        rules={[{ required: true }]}
        placeholder="请输入 SEO 关键字"
      />

      <ProFormTextArea
        label="SEO 描述"
        name="website_seo_description"
        placeholder="请输入 SEO 描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProFormItem colon={false}>
        <Button type="primary" onClick={() => onSubmit(formInstance)}>
          保存
        </Button>
      </ProFormItem>
    </ProForm>
  )
}

export default SeoPage
