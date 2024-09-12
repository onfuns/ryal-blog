import ArticleAnchor from '@/components/Article/Anchor'
import Comment from '@/components/Comment'
import { ArticleCommentStatusEnumType, type ArticleType } from '@/service'
import { GetServerSidePropsContextProps } from '@/type'
import { Icon, Time } from '@ryal/ui-kit'
import { Space } from 'antd'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import './index.less'

const ArticleInfo = ({ article }: { article: ArticleType }) => {
  const content_dom_id = 'article-info-content'

  return (
    <div className="width-center-1000 py-10">
      <div className="flex w-100%">
        <div className="p-24 bg-#fff rd-4 flex-1">
          <div className="mb-6 text-24">{article.title}</div>
          <Space size={12} className="color-#999 mt-8">
            <Space>
              <Icon name="icon-time" />
              <Time value={article.created_at} format="YYYY年MM月DD日" />
            </Space>

            <Space>
              <Icon name="icon-reads" />
              {article.category?.name}
            </Space>

            {article?.tags?.length > 0 && (
              <Space>
                <Icon name="icon-a-business-icon-Bigpromotion" />
                {article?.tags.map(({ name }, index) => <span key={index}>{name}</span>)}
              </Space>
            )}
          </Space>
          <div
            className="article-info-content break-words lh-[1.75]"
            id={content_dom_id}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <ArticleAnchor
          heading={() => document.getElementById(content_dom_id)?.querySelectorAll('h2,h3')}
        />
      </div>
      {article.comment_status === ArticleCommentStatusEnumType.Opened && (
        <Comment articeId={article.id} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContextProps<any, any>) => {
  const { articleStore } = req.mobxStore
  const article = await articleStore.getInfoById(params?.id)

  if (article.content) {
    article.content = markdownIt({
      html: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value
          } catch (error) {
            console.log(error)
          }
        }
        return ''
      },
    })
      .use(markdownItAnchor)
      .render(article.content)
  }
  return {
    props: {
      article,
    },
  }
}

export default ArticleInfo
