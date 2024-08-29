import ArticleAnchor from '@/components/Article/Anchor'
import Comment from '@/components/Comment'
import { ArticleCommentStatusEnumType, type ArticleType } from '@/service'
import { Icon, Time } from '@ryal/ui-kit'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import './index.less'

const ArticleInfo = ({ article }: { article: ArticleType }) => {
  const content_dom_id = 'article-info-content'
  const spanClass = 'inline-flex items-center mr-12'
  const dividerClass = 'mr-5 text-16 font-not-italic'

  return (
    <div className="w-1000-center py-10">
      <div className="flex w-100%">
        <div className="p-24 bg-#fff rd-4 flex-1">
          <div className="mb-6 text-30 fw-700 color-#303030 ml-0 indent-0 break-all">
            {article.title}
          </div>
          <div className="color-#666 mt-8">
            <span className={spanClass}>
              <Icon name="icon-time" className={dividerClass} />
              <Time value={article.created_at} format="YYYY年MM月DD日" />
            </span>
            <span className={spanClass}>
              <Icon name="icon-reads" className={dividerClass} />
              分类：{article.category?.name}
            </span>
            {article?.tags?.length > 0 && (
              <span className={spanClass}>
                <Icon name="icon-a-business-icon-Bigpromotion" className={dividerClass} />
                标签：
                {article?.tags.map(({ name }, index) => (
                  <i key={index} className={dividerClass}>
                    {name}
                  </i>
                ))}
              </span>
            )}
          </div>
          <div
            className="article-info-content break-words lh-[1.75]"
            id={content_dom_id}
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
        <ArticleAnchor
          heading={() => {
            return document.getElementById(content_dom_id)?.querySelectorAll('h2,h3,h4,h5')
          }}
        />
      </div>
      {article.comment_status === ArticleCommentStatusEnumType.Opened && (
        <Comment articeId={article.id} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const { articleStore } = req.mobxStore
  const article = await articleStore.getInfoById(params?.id)
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
      return null
    },
  })
    .use(markdownItAnchor)
    .render(article.content)
  return {
    props: {
      article,
    },
  }
}

export default ArticleInfo
