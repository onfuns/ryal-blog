import { websiteService } from '@/service'
import { ProForm, ProFormItem } from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { Button, Tabs, message } from 'antd'
import { useEffect } from 'react'
import Seo from './components/Seo'
import Site from './components/Site'
import { TabKeyEnum } from './enum'

const WebsitePage = () => {
  const [formInstance] = ProForm.useForm()
  const { data, refresh } = useRequest(websiteService.getList)
  const websiteConfig = data?.data || []

  const onSubmit = async () => {
    const values = await formInstance.validateFields()
    const params = websiteConfig?.map(({ id, name }) => {
      return { id, name, value: values[name] }
    })
    await websiteService.update(params)
    message.success('设置成功')
    refresh?.()
  }

  useEffect(() => {
    const detail = websiteConfig.reduce((obj: Record<string, string>, current) => {
      obj[current.name] = current.value
      return obj
    }, {})
    formInstance.setFieldsValue({ ...detail })
  }, [websiteConfig])

  const tabs = [
    {
      key: TabKeyEnum.Site,
      label: '网站信息',
      children: <Site />,
    },
    {
      key: TabKeyEnum.Seo,
      label: 'SEO设置',
      children: <Seo />,
    },
  ]

  return (
    <ProForm labelCol={{ span: 4 }} form={formInstance}>
      <Tabs defaultActiveKey={TabKeyEnum.Site} hideAdd items={tabs} />
      <ProFormItem colon={false}>
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
      </ProFormItem>
    </ProForm>
  )
}

export default WebsitePage
