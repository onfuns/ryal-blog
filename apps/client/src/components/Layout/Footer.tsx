import { useStore } from '@/hooks'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'

const Footer = () => {
  const { webSiteStore } = useStore()
  const { websiteInfo } = webSiteStore

  return (
    <div className="flex items-center h-40">
      <div className="width-center-1200 text-center">
        {[
          {
            text: `©2018-${dayjs().year()} by ${websiteInfo.author}`,
            href: websiteInfo.git_repository_url,
          },
          { text: 'created by Next.js', href: 'https://nextjs.org' },
        ].map(({ text, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="color-#999 mr-10 text-12"
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  )
}

export default observer(Footer)
