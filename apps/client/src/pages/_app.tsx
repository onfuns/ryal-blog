import Layout from '@/components/Layout'
import { RootStore } from '@/store'
import '@/style/global.less'
import '@/utils/http-request'
import '@fontsource/jetbrains-mono'
import App from 'next/app'

const CustomApp = props => <Layout {...props} />

CustomApp.getInitialProps = async function (appContext) {
  const mobxStore = RootStore
  appContext.ctx.req.mobxStore = RootStore
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps,
    initialMobxState: mobxStore,
  }
}

export default CustomApp
