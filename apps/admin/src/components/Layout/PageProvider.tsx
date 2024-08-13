import { ConfigContextProvider, type ConfigConsumerProps } from '@nest-components/ui-kit'
import { Spin, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider as MobxProvider } from 'mobx-react'
import React, { Suspense } from 'react'
message.config({ maxCount: 1 })

export default function LayoutProvider(props: React.PropsWithChildren) {
  const antdConfig: ConfigConsumerProps['antdConfig'] = {
    theme: {
      token: {
        colorPrimary: '#52c41a',
      },
    },
    locale: zhCN,
  }

  return (
    <MobxProvider>
      <ConfigContextProvider antdConfig={antdConfig}>
        <Suspense
          fallback={
            <div className="h-100vh flex-center">
              <Spin spinning={true} />
            </div>
          }
        >
          {props.children}
        </Suspense>
      </ConfigContextProvider>
    </MobxProvider>
  )
}
