import { websiteService } from '@/service'
import { useRequest } from 'ahooks'
import { FormInstance, Tabs, message } from 'antd'
import Seo from './components/Seo'
import Site from './components/Site'

enum TabKeyEnum {
  /** 站点 */
  Site = 'site',
  /** Seo */
  Seo = 'site',
}

const WebsitePage = () => {
  const { data, refresh } = useRequest(websiteService.getList)
  const websiteConfig = data?.data || []

  const onSubmit = async (form: FormInstance) => {
    const values = await form.validateFields()
    const params = websiteConfig?.map(({ id, name }) => {
      return {
        id,
        name,
        value: values[name],
      }
    })
    await websiteService.update(params)
    message.success('设置成功')
    refresh?.()
  }

  const detail = websiteConfig.reduce((obj: Record<string, string>, current) => {
    obj[current.name] = current.value
    return obj
  }, {})

  const tabs = [
    {
      key: TabKeyEnum.Site,
      label: '网站信息',
      children: <Site onSubmit={onSubmit} detail={detail} />,
    },
    {
      key: TabKeyEnum.Seo,
      label: 'SEO设置',
      children: <Seo onSubmit={onSubmit} detail={detail} />,
    },
  ]

  return <Tabs defaultActiveKey={TabKeyEnum.Site} hideAdd items={tabs} />
}

export default WebsitePage
