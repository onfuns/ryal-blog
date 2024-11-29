import { useEffect } from 'react'
import tocbot from 'tocbot'
import './index.less'

export type ArticleTocProps = {
  /** 类选择器 */
  contentSelector: string
}

const ArticleToc = ({ contentSelector }: ArticleTocProps) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector,
      headingSelector: 'h1, h2, h3, h4',
      hasInnerContainers: true,
      collapseDepth: 5,
    })
  }, [contentSelector])

  return (
    <div className="toc sticky top-60 w-260 ml-20 min-h-300 bg-#fff rd-4 flex-shrink-0 flex-self-start"></div>
  )
}

export default ArticleToc
