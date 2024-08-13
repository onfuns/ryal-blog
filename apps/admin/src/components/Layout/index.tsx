import { useHistory, useStore } from '@/hooks'
import { routes } from '@/routes'
import '@/style/global.less'
import '@/style/uno.css'
import { observer } from 'mobx-react'
import { PropsWithChildren, useEffect } from 'react'
import { AliveScope } from 'react-activation'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import PageProvider from './PageProvider'
import PageTabs from './PageTabs'
import ValidateLogin from './ValidateLogin'

const LayoutContainer = observer((props: PropsWithChildren) => {
  const { headerStore: store } = useStore()
  const {
    location: { pathname, search },
  } = useHistory()

  useEffect(() => {
    const router = routes?.find(item => item.path === pathname)
    store.updateTab({ ...router, search })
    store.setCurrentTabPath(pathname)
  }, [pathname])

  return (
    <div className="flex overflow-hidden h-100vh">
      <PageMenu menuCollapsed={store.menuCollapsed} />
      <div className="w-100%">
        <PageHeader store={store} />
        <PageTabs store={store} />
        <AliveScope>
          <div className="overflow-auto h-[calc(100vh-90px)] p-12 bg-#f6f6f6">
            <AliveScope>{props.children}</AliveScope>
          </div>
        </AliveScope>
      </div>
    </div>
  )
})

const Layout = (props: PropsWithChildren) => {
  const history = useHistory()
  const current = routes.find(router => router.path === history.location.pathname)
  if (current?.redirect) {
    history.push(current.redirect)
    return null
  }
  const isHideLayout = current?.layout === false

  const content = isHideLayout ? (
    props.children
  ) : (
    <ValidateLogin>
      <LayoutContainer {...props} />
    </ValidateLogin>
  )

  return <PageProvider>{content}</PageProvider>
}

export default Layout
