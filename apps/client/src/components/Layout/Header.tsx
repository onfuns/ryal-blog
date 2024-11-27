import { useStore } from '@/hooks'
import { observer } from 'mobx-react'
import Head from 'next/head'
import Script from 'next/script'

export const Header = () => {
  const { webSiteStore } = useStore()
  const { websiteInfo } = webSiteStore

  const navList = [
    { name: '首页', url: '/' },
    { name: '项目地址', url: websiteInfo.git_repository_url },
  ]

  return (
    <header className="flex items-center h-40">
      <Head>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content={websiteInfo.description} />
        <meta name="keywords" content={websiteInfo.keywords} />
        <link rel="shortcut icon" href="/images/logo.png" />
        <title>{`${websiteInfo.title} 演示系统`}</title>
      </Head>
      <Script src="/plugins/analysis.js" defer />
      <div className="width-center-1000 flex items-center justify-between">
        <a href="/" className="text-18 font-comic">
          {websiteInfo.title}
        </a>
        <div className="flex items-center gap-16">
          {navList.map(({ name, url }) => (
            <a key={url} href={url} className="text-18 font-comic">
              {name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default observer(Header)
