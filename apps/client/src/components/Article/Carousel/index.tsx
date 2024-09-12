import config from '@/config'
import { Carousel } from 'antd'
import Image from 'next/image'

const ArticleCarousel = () => {
  const data = [
    {
      url: config.gitUrl,
      img: '/images/carousel-demo.png',
    },
  ]
  return (
    <Carousel autoplay className="mb-10 rd-4">
      {data.map((carousel, index) => (
        <a key={index} href={carousel.url} target="_blank" rel="noreferrer">
          <Image src={carousel.img} alt="轮播图" fill className="h-180" />
        </a>
      ))}
    </Carousel>
  )
}

export default ArticleCarousel
