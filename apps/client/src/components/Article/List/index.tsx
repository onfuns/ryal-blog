import { ArticleStore } from '@/store'
import { Icon, Time } from '@ryal/ui-kit'
import { Pagination } from 'antd'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const ArticleList = (props: Pick<ArticleStore, 'result'>) => {
  const { result } = props
  const router = useRouter()

  return (
    <div className="rd-4 overflow-hidden">
      {result?.data?.map((article, index) => (
        <div key={index} className="bg-#fff border-bottom-1-solid-#eee p-20">
          <div className="flex items-center color-#98a6ad">
            <Time value={article.publish_time} type="date" />
            <span className="mx-3">{article.author}</span>
          </div>
          <a
            href={`/article/${article.id}`}
            className="inline-block color-#303030 text-18 fw-700 pt-8 pb-4 lh-24 "
          >
            {article.title}
          </a>
          <div
            className="relative mb-6 color-#98a6ad max-h-90 overflow-hidden webkit-clamp-4  text-ellipsis break-all"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
          <div className="flex items-center color-#98a6ad">
            {article?.tags?.map((tag, idx) => (
              <Fragment key={idx}>
                {idx === 0 && <Icon name="icon-a-business-icon-Bigpromotion" />}
                <span className="mx-5">{tag.name}</span>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
      {result?.total > 20 && (
        <div className="flex-center mt-30">
          <Pagination
            defaultCurrent={(router?.query?.page || 1) as number}
            total={result.total}
            size="small"
            pageSize={20}
            hideOnSinglePage
            itemRender={page => <a href={`${router.pathname}?page=${page}`}>{page}</a>}
          />
        </div>
      )}
    </div>
  )
}

export default ArticleList
