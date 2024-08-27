import { useHistory, useStore } from '@/hooks'
import { routes } from '@/routes'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import './index.less'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const PageTab = () => {
  const history = useHistory()
  const { pathname, search, state } = history.location
  const { tabStore } = useStore()
  const { onRemoveTab, onUpdateTab, onSelectedTabPath, tabs, selectedTabPath } = tabStore

  useEffect(() => {
    const router = routes?.find(item => item.path === pathname)
    if (router) {
      onUpdateTab({ ...router, search, state })
      onSelectedTabPath(pathname)
    }
  }, [pathname])

  const onTabChange = (path: string) => {
    const tab = tabs?.find(t => t.path === path)
    history.push({
      pathname: path,
      search: history.searchToString(tab?.search || ''),
    })
  }

  const onTabEdit = (path: TargetKey, action: 'add' | 'remove') => {
    if (typeof path === 'string' && action === 'remove') {
      onRemoveTab(path)
      const index = tabs?.findIndex(t => t.path === path)
      //如果关闭的是第一个则定位后一个，否则定位第一个
      const router = index === 0 ? tabs?.[1] : tabs?.[0]
      onTabChange(router?.path)
    }
  }

  return (
    <Tabs
      activeKey={selectedTabPath}
      className="page-layout-tab"
      type="editable-card"
      hideAdd
      onChange={onTabChange}
      onEdit={onTabEdit}
      animated={false}
      items={tabs.map(t => ({
        label: t.name,
        key: t.path,
        closable: tabs.length !== 1,
      }))}
    />
  )
}

export default observer(PageTab)
