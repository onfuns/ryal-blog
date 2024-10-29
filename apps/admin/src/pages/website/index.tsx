import { websiteService } from '@/service'
import { ProForm, ProFormItem, type ProFormInstance } from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { Button, Tabs, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Seo from './components/Seo'
import Site from './components/Site'
import { TabKeyEnum } from './enum'

const WebsitePage = () => {
  const formRef = useRef<ProFormInstance>(null)
  const [tabKey, setTabKey] = useState(TabKeyEnum.Website)
  const { data, refresh } = useRequest(websiteService.getList)
  const websiteConfig = data?.data || []

  const onSubmit = async () => {
    const values = (await formRef.current?.validateFieldsReturnFormatValue?.()) || {}
    const list = Object.keys(values)?.map(fieldName => ({
      id: websiteConfig?.find(({ name }) => name === fieldName)?.id,
      name: fieldName,
      value: values[fieldName],
    }))
    await websiteService.update({ list })
    message.success('设置成功')
    refresh?.()
  }

  useEffect(() => {
    const detail = websiteConfig.reduce((obj: Record<string, string>, current) => {
      obj[current.name] = current.value
      return obj
    }, {})
    formRef.current?.setFieldsValue({ ...detail })
  }, [websiteConfig])

  return (
    <div className="bg-#fff p-12">
      <Tabs
        activeKey={tabKey}
        hideAdd
        items={[
          { key: TabKeyEnum.Website, label: '网站信息' },
          { key: TabKeyEnum.Seo, label: 'SEO设置' },
        ]}
        onChange={value => setTabKey(value as TabKeyEnum)}
      />
      <ProForm
        labelCol={{ span: 4 }}
        layout="horizontal"
        className="max-w-800"
        colon={false}
        submitter={false}
        formRef={formRef}
      >
        {tabKey === TabKeyEnum.Website && <Site />}
        {tabKey === TabKeyEnum.Seo && <Seo />}
        <ProFormItem label=" ">
          <Button type="primary" onClick={onSubmit}>
            保存
          </Button>
        </ProFormItem>
      </ProForm>
    </div>
  )
}

export default WebsitePage
