import { commonService } from '@/service'
import { Time } from '@ryal/ui-kit'
import { useRequest } from 'ahooks'
import { Card, List, Space } from 'antd'

const DashboardPage = () => {
  const { data } = useRequest(commonService.getDashboardData)
  const dashboardData = data?.data || {}
  const { article, comment, user } = dashboardData

  const statisticsItems = [
    { title: '文章总数', value: article?.count || 0 },
    { title: '评论总数', value: comment?.count || 0 },
  ]
  return (
    <>
      <div>
        <Card title="数据统计">
          <div>
            {statisticsItems.map(({ title, value }) => (
              <div key={title}>
                <div className="py-15 pl-20 border-1 border-solid border-#e6ebf5 border-rd-2 shadow-[0_2px_12px_0_rgba(0,0,0,0.1)]">
                  <div className="color-#a3aed0">{title}</div>
                  <div className="text-26">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="用户信息">
          <div>
            上次登录时间： <Time value={user?.last_login_at} />
          </div>
          <div>上次登录IP： {user?.last_login_ip?.replace('::ffff:', '')}</div>
        </Card>
      </div>
      <div className="flex mt-20">
        <Card title="最新评论">
          <List
            itemLayout="horizontal"
            dataSource={comment?.data || []}
            renderItem={record => (
              <List.Item>
                <List.Item.Meta
                  className="w-100%"
                  title={
                    <div>
                      <span className="mr-5">{record.name}</span>
                      <Space>
                        在
                        <a
                          target="_blank"
                          href={`/article/${record?.article?.id}`}
                          rel="noreferrer"
                        >
                          {record?.article?.title}
                        </a>
                        评论
                      </Space>
                      <Time value={record.created_at} className="float-right" />
                    </div>
                  }
                  description={record.content}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </>
  )
}

export default DashboardPage
