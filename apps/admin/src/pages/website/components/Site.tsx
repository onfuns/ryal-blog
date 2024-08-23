import { ProFormText, ProFormTextArea } from '@ant-design/pro-components'

const SitePage = () => {
  return (
    <>
      <ProFormText label="网站名称" name="website_title" placeholder="请输入网站名称" />
      <ProFormText label="ICP 备案" name="website_icp" placeholder="请输入 ICP 备案" />
      <ProFormText label="站长邮箱" name="website_email" placeholder="请输入站长邮箱" />
      <ProFormText label="联系电话" name="website_phone" placeholder="请输入联系电话" />
      <ProFormText label="QQ 二维码" name="website_qq_image" placeholder="请输入 QQ 二维码地址" />
      <ProFormText
        label="微信二维码"
        name="website_wechat_image"
        placeholder="请输入微信二维码地址"
      />
      <ProFormTextArea label="统计代码" name="website_analysis_code" placeholder="请输入统计代码" />
    </>
  )
}

export default SitePage
