import { useHistory, useLogin } from '@/hooks'
import { routes } from '@/routes'
import '@/style/global.less'
import '@/style/uno.css'
import { observer } from 'mobx-react'
import { PropsWithChildren } from 'react'
import { AliveScope, KeepAlive } from 'react-activation'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import PageProvider from './PageProvider'
import PageTab from './PageTab'

const LayoutContainer = observer((props: PropsWithChildren) => {
  return (
    <div className="flex overflow-hidden h-100vh">
      <PageMenu />
      <div className="w-100%">
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
})

const Layout = (props: PropsWithChildren) => {
  const history = useHistory()
  const isLogin = useLogin()
  const current = routes.find(router => router.path === history.location.pathname)
  if (current?.redirect) {
    history.push(current.redirect)
    return null
  }
  const isHideLayout = current?.meta?.layout === false
  let content = null
  if (isLogin) {
    content = isHideLayout ? props.children : <LayoutContainer {...props} />
  }

  return <PageProvider>{content}</PageProvider>
}

export default Layout
