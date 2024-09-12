import config from '@/config'
import Head from 'next/head'
import Script from 'next/script'

export const Header = () => {
  const navList = [
    { name: '首页', url: '/' },
    { name: '项目地址', url: config.gitUrl },
  ]

  return (
    <header className="flex items-center h-40">
      <Head>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="nextjs, node blog, node 博客" />
        <meta name="keywords" content="nextjs, node blog, node 博客" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <title>Ryal Blog 演示系统</title>
      </Head>
      <Script src="/plugins/analysis.js" defer />
      <div className="width-center-1000 flex items-center justify-between">
        <a href="/" className="text-18 font-comic">
          Ryal Blog
        </a>
        <div className="flex gap-12">
          {navList.map(({ name, url }) => (
            <a key={url} href={url} className="font-comic">
              {name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
