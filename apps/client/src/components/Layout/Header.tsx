import Head from 'next/head'
import Script from 'next/script'

export const Header = () => {
  return (
    <header className="flex items-center h-40">
      <Head>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="node博客系统" />
        <meta name="keywords" content="node博客,nodejs博客,博客搭建" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <title>Ryal Blog演示系统</title>
      </Head>
      <Script src="/plugins/analysis.js" defer />
      <div className="width-center-1000 flex items-center justify-between">
        <a href="/" className="text-18 font-comic">
          Ryal Blog
        </a>
        <div className="flex gap-12">
          <a href="/" className="font-comic">
            首页
          </a>
          <a href="https://github.com/onfuns/nestjs-blog" className="font-comic">
            项目地址
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
