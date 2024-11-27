import { useStore } from '@/hooks'
import { Carousel } from 'antd'
import { observer } from 'mobx-react'
import Image from 'next/image'

const ArticleCarousel = () => {
  const { webSiteStore } = useStore()
  const { websiteInfo } = webSiteStore

  const data = [
    {
      url: websiteInfo.git_repository_url,
      img: '/images/carousel-demo.png',
    },
  ]

  return (
    <Carousel autoplay className="mb-10 rd-4" adaptiveHeight>
      {data.map(({ url, img }) => (
        <a key={url} href={url} target="_blank" rel="noreferrer">
          <Image
            src={img}
            alt="轮播图"
            width={500}
            height={180}
            style={{ width: '100%', height: 180, borderRadius: 4 }}
          />
        </a>
      ))}
    </Carousel>
  )
}

export default observer(ArticleCarousel)
