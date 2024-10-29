import { useHistory, useLogin } from '@/hooks'
import { routes } from '@/routes'
import '@/style/global.less'
import '@/style/uno.css'
import { ConfigContextProvider } from '@ryal/ui-kit'
import { Spin, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider as MobxProvider } from 'mobx-react'
import { PropsWithChildren, Suspense } from 'react'
import { AliveScope, KeepAlive } from 'react-activation'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import PageTab from './PageTab'
message.config({ maxCount: 1 })

const PageLayoutContainer = (props: PropsWithChildren) => {
  return (
    <div className="flex overflow-hidden h-100vh">
      <PageMenu />
      <div className="w-100% overflow-hidden">
        <PageHeader />
        <PageTab />
        <AliveScope>
          <KeepAlive>
            <div className="overflow-auto h-[calc(100vh-90px)] p-12 bg-#f6f6f6">
              {props.children}
            </div>
          </KeepAlive>
        </AliveScope>
      </div>
    </div>
  )
}

const PageLayout = (props: PropsWithChildren) => {
  const history = useHistory()
  const { logined } = useLogin()
  const current = routes.find(router => router.path === history.location.pathname)
  if (current?.redirect) {
    history.push(current.redirect)
    return null
  }
  let content = props.children
  if (logined && current?.meta?.layout !== false) {
    content = <PageLayoutContainer {...props} />
  }

  const FallbackLoading = () => (
    <div className="h-100vh flex-center">
      <Spin spinning={true} />
    </div>
  )

  return (
    <MobxProvider>
      <ConfigContextProvider
        antdConfig={{
          theme: { token: { colorPrimary: '#ff6500' } },
          locale: zhCN,
        }}
      >
        <Suspense fallback={<FallbackLoading />}>{content}</Suspense>
      </ConfigContextProvider>
    </MobxProvider>
  )
}

export default PageLayout
