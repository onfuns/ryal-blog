import ArticleCarousel from '@/components/Article/Carousel'
import ArticleList from '@/components/Article/List'
import ArticleMenu from '@/components/Article/Menu'
import { ArticleStore } from '@/store'
import { type GetServerSidePropsContextProps } from '@/type'
import { findByValue } from '@/utils'
import markdownIt from 'markdown-it'

export interface IArticlePageProps {
  categoryList: any[]
  articleData: ArticleStore['listData']
}

const Article = ({ categoryList, articleData }: IArticlePageProps) => {
  return (
    <div className="width-center-1000 flex">
      <ArticleMenu data={categoryList} />
      <div className="w-1000 overflow-hidden">
        <ArticleCarousel />
        <ArticleList listData={articleData} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContextProps<any, any>) => {
  const { articleStore, categoryStore } = req.mobxStore
  await categoryStore.get()
  const ename = query?.ename
  const params = {
    current: req.query?.page || 1,
    pageSize: 20,
    cid: undefined,
  }

  const categoryList = categoryStore.listData
  const defaultProps = {
    categoryList,
    articleData: {},
  }

  if (ename) {
    const category = findByValue(categoryList, 'ename', `/${ename}`)
    if (category?.id) {
      params.cid = category?.id
    } else {
      return { props: defaultProps }
    }
  }
  const articleData = await articleStore.get(params)
  articleData?.data?.map(acticle => {
    if (!acticle.description) {
      const more = acticle.content.indexOf('<!--more-->')
      if (more > -1) {
        acticle.description = markdownIt().render(acticle.content.substring(0, more))
      }
    }
    return acticle
  })

  return {
    props: { ...defaultProps, articleData },
  }
}

export default Article
