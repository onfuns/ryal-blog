import { commonService } from '@/service'
import { Text, Time } from '@ryal/ui-kit'
import { useRequest } from 'ahooks'
import { Card, List, Space } from 'antd'

const DashboardPage = () => {
  const { data } = useRequest(commonService.getDashboardData)
  const dashboardData = data?.data
  const { article, comment, user } = dashboardData || {}

  const statisticsItems = [
    { title: '文章总数', value: article?.total },
    { title: '评论总数', value: comment?.total },
  ]
  return (
    <>
      <div className="flex gap-12">
        <Card title="数据统计" className="flex-1">
          <Space size={12} className="flex" classNames={{ item: 'w-100%' }}>
            {statisticsItems.map(({ title, value }) => (
              <div key={title}>
                <div className="py-15 pl-20 border-1 border-solid border-#e6ebf5 rd-4">
                  <div className="color-#a3aed0">{title}</div>
                  <div className="text-26">{value}</div>
                </div>
              </div>
            ))}
          </Space>
        </Card>
        <Card title="用户信息" className="flex flex-col flex-1">
          <Text.Row label="上次登录时间：" span={[4, 20]}>
            <Time value={user?.last_login_at} />
          </Text.Row>

          <Text.Row label="上次登录IP：" span={[4, 20]} className="mt-12">
            <Text value={user?.last_login_ip?.replace('::ffff:', '')} />
          </Text.Row>
        </Card>
      </div>

      <Card title="最新评论" className="mt-20">
        <List
          itemLayout="horizontal"
          dataSource={comment?.data || []}
          renderItem={record => (
            <List.Item>
              <List.Item.Meta
                className="w-100%"
                title={
                  <div className="flex items-center">
                    <span className="mr-5">{record.name}</span>
                    <Space>
                      在
                      <a target="_blank" href={`/article/${record?.article?.id}`} rel="noreferrer">
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
    </>
  )
}

export default DashboardPage
