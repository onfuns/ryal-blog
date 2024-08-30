import { useStore } from '@/hooks'
import { isServer } from '@/utils'
import { ConfigContextProvider, type ConfigConsumerProps } from '@ryal/ui-kit'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'mobx-react'
import { type AppProps } from 'next/app'
import Footer from './Footer'
import Header from './Header'

const Layout = ({
  Component,
  pageProps = {},
  initialMobxState,
}: AppProps & { initialMobxState: any }) => {
  const stores = isServer ? initialMobxState : useStore()
  const antdConfig: ConfigConsumerProps['antdConfig'] = {
    theme: { token: { colorPrimary: '#ff502c' } },
    locale: zhCN,
  }

  return (
    <Provider {...stores}>
      <ConfigContextProvider antdConfig={antdConfig}>
        <Header />
        <div className="flex flex-1 justify-center bg-#f4f5f5 min-h-[calc(100vh-80px)] pt-20">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ConfigContextProvider>
    </Provider>
  )
}

export default Layout
