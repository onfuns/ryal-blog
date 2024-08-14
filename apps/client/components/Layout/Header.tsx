import Head from 'next/head'
import Script from 'next/script'

export default function Header() {
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
      <div className="w-1000-center flex items-center justify-between">
        <a href="/" className="text-18 font-comic">
          Ryal Blog
        </a>
        <div>
          <a href="/" className="font-comic">
            首页
          </a>
          <a
            href="https://hao.onfuns.com"
            target="_blank"
            rel="noreferrer"
            className="ml-20 font-comic"
          >
            前端导航
          </a>
        </div>
      </div>
    </header>
  )
}
