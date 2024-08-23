import { ProFormText, ProFormTextArea } from '@ant-design/pro-components'

const SeoPage = () => {
  return (
    <>
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
    </>
  )
}

export default SeoPage
