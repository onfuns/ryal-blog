import config from '@/config'
import dayjs from 'dayjs'

const Footer = () => {
  return (
    <div className="flex items-center h-40">
      <div className="width-center-1000 text-center">
        {[
          {
            text: `©2018-${dayjs().year()} by onfuns`,
            href: config.gitUrl,
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

export default Footer
