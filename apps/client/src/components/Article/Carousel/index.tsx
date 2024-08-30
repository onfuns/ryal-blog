import { Carousel as AntdCarousel } from 'antd'
import Image from 'next/image'

const ArticleCarousel = () => {
  const data = [
    {
      url: 'https://github.com/onfuns/nestjs-blog',
      img: '/images/carousel-demo.png',
    },
  ]
  return (
    <AntdCarousel autoplay className="mb-10 rd-4 overflow-hidden">
      {data.map((carousel, index) => (
        <a key={index} href={carousel.url} target="_blank" rel="noreferrer" className="h-180">
          <Image src={carousel.img} alt="轮播图" fill />
        </a>
      ))}
    </AntdCarousel>
  )
}

export default ArticleCarousel
