import { ArticleStore } from '@/store'
import { Icon, Time } from '@ryal/ui-kit'
import { Empty, Pagination, Space } from 'antd'
import { useRouter } from 'next/router'

const ArticleList = (props: Pick<ArticleStore, 'listData'>) => {
  const { listData } = props
  const router = useRouter()
  const isEmpty = !listData?.data?.length

  if (isEmpty) {
    return <Empty description={<span className="color-#999">暂无数据</span>} />
  }

  return (
    <div className="rd-4 overflow-hidden">
      {listData?.data?.map((article, index) => (
        <div key={index} className="bg-#fff border-bottom-1-solid-#eee p-20">
          <Space size={5} className=" color-#999">
            {article.publish_time && <Time value={article.publish_time} type="date" />}
            <span data-item={article.publish_time}>{article.author}</span>
          </Space>
          <a href={`/article/${article.id}`} className="block text-16 mt-8 mb-4">
            {article.title}
          </a>
          <div
            className="relative mb-6 color-#999 max-h-90 text-ellipsis-line-4 break-all"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
          <div className="color-#999">
            {article?.tags?.map((tag, idx) => (
              <Space size={5} key={idx}>
                {idx === 0 && <Icon name="icon-a-business-icon-Bigpromotion" />}
                <span>{tag.name}</span>
              </Space>
            ))}
          </div>
        </div>
      ))}
      {!!listData?.total && listData.total > 20 && (
        <div className="flex-center mt-30">
          <Pagination
            defaultCurrent={(router?.query?.page || 1) as number}
            total={listData.total}
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
