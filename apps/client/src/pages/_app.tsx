import Layout from '@/components/Layout'
import { RootStore } from '@/store'
import '@/style/global.less'
import '@/utils/http-request'
import App, { type AppContext, type AppProps } from 'next/app'

const CustomApp = (props: AppProps & { initialMobxState: any }) => <Layout {...props} />

CustomApp.getInitialProps = async function (appContext: AppContext) {
  const mobxStore = RootStore
  if (appContext.ctx.req) {
    ;(appContext.ctx.req as any).mobxStore = RootStore
  }
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps,
    initialMobxState: mobxStore,
  }
}

export default CustomApp
