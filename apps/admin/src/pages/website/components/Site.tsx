import { ProForm, ProFormItem, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useEffect } from 'react'
import { type PageDetailType } from '../type'

const SitePage = ({ onSubmit, detail }: PageDetailType) => {
  const [formInstance] = ProForm.useForm()

  useEffect(() => {
    formInstance.setFieldsValue({ ...detail })
  }, [detail])

  return (
    <ProForm labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={formInstance}>
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
      <ProFormItem colon={false}>
        <Button type="primary" onClick={() => onSubmit(formInstance)}>
          保存
        </Button>
      </ProFormItem>
    </ProForm>
  )
}

export default SitePage
