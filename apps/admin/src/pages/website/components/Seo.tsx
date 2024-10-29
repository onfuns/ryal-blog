import { ProFormText, ProFormTextArea } from '@ant-design/pro-components'

const SeoPage = () => {
  return (
    <>
      <ProFormText label="SEO 标题" name="seo_title" placeholder="请输入 SEO 标题" />
      <ProFormText label="SEO 关键字" name="seo_keywords" placeholder="请输入 SEO 关键字" />
      <ProFormTextArea
        label="SEO 描述"
        name="seo_description"
        placeholder="请输入 SEO 描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />
    </>
  )
}

export default SeoPage
