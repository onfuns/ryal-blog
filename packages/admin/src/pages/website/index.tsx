import { getWebsiteConfig, updateWebsiteConfig } from '@/actions'
import { useRequest } from 'ahooks'
import { FormInstance, Tabs, message } from 'antd'
import Seo from './components/Seo'
import Site from './components/Site'

export default function WebsitePage() {
  const { data: { data: websiteConfig = {} } = {}, refresh } = useRequest(getWebsiteConfig)

  const onSubmit = async (form: FormInstance) => {
    const values = await form.validateFields()
    const params = websiteConfig.map(({ id, name }) => {
      return {
        id,
        name,
        value: values[name],
      }
    })
    await updateWebsiteConfig(params)
    message.success('设置成功')
    refresh?.()
  }

  const detail = websiteConfig.reduce((obj, current) => {
    obj[current.name] = current.value
    return obj
  }, {})

  return (
    <div className="p-10">
      <Tabs
        defaultActiveKey="site"
        hideAdd
        animated={false}
        items={[
          {
            key: 'site',
            label: '网站信息',
            children: <Site onSubmit={onSubmit} detail={detail} />,
          },
          {
            key: 'seo',
            label: 'SEO设置',
            children: <Seo onSubmit={onSubmit} detail={detail} />,
          },
        ]}
      />
    </div>
  )
}
