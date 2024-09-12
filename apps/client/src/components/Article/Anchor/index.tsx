import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import './index.less'

export type ArticleAnchorProps = {
  heading?: () => NodeListOf<Element> | undefined
}
export type ArticleAnchorItemType = {
  title?: string | null
  tagName?: string
  index: number
}

const ArticleAnchor = ({ heading }: ArticleAnchorProps) => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)
  const [anchorList, setAnchoList] = useState<ArticleAnchorItemType[]>([])
  const anchorListDomRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const headings = heading?.()
    const scrollToAnchor = (entries: IntersectionObserverEntry[]) => {
      const io = entries[0]
      if (io.isIntersecting === true) {
        const index = Array.prototype.indexOf.call(headings, io.target)
        setCurrentHeadingIndex(index)
        //锚点区域如果高度过出现滚动条则自动滚动到可视区域
        const anchorListDom = anchorListDomRef?.current
        if (anchorListDom && anchorListDom.offsetHeight > 600) {
          const top = (document.querySelectorAll('[data-anchor-index]')[index] as HTMLElement)
            .offsetTop
          //滚动到距离列表顶部 250 位置
          anchorListDom.offsetParent?.scrollTo({
            top: top > 580 ? top - 250 : 0,
            behavior: 'smooth',
          })
        }
      }
    }
    const observer = new IntersectionObserver(scrollToAnchor, { threshold: [1] })
    const data: ArticleAnchorItemType[] = []
    headings?.forEach((node, index) => {
      observer.observe(node)
      data.push({ title: node.textContent, tagName: node.tagName, index })
    })
    setAnchoList(data)
    return () => {
      headings?.forEach(node => observer.unobserve(node))
    }
  }, [])

  const onChange = ({ index }: ArticleAnchorItemType) => {
    const headings = heading?.()
    setCurrentHeadingIndex(index)
    headings?.[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!anchorList?.length) return null

  return (
    <div className="sticky top-60 w-260 ml-20 min-h-300 max-h-600 overflow-auto p-20 bg-#fff rd-4 flex-shrink-0 flex-self-start ">
      <ul ref={anchorListDomRef}>
        {anchorList.map((item, index) => (
          <li
            key={index}
            data-anchor-index={item.index}
            className={classnames(item.tagName, {
              active: currentHeadingIndex === index,
            })}
          >
            <a onClick={() => onChange(item)} className="relative block py-4 pl-15">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticleAnchor
