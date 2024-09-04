import { ConfigContextProvider, type ConfigConsumerProps } from '@ryal/ui-kit'
import { Spin, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider as MobxProvider } from 'mobx-react'
import React, { Suspense } from 'react'
message.config({ maxCount: 1 })

const FallbackLoading = () => (
  <div className="h-100vh flex-center">
    <Spin spinning={true} />
  </div>
)

const PageProvider = (props: React.PropsWithChildren) => {
  const antdConfig: ConfigConsumerProps['antdConfig'] = {
    theme: { token: { colorPrimary: '#ff6500' } },
    locale: zhCN,
  }

  return (
    <MobxProvider>
      <ConfigContextProvider antdConfig={antdConfig}>
        <Suspense fallback={<FallbackLoading />}>{props.children}</Suspense>
      </ConfigContextProvider>
    </MobxProvider>
  )
}

export default PageProvider
