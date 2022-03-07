import React, { useEffect } from 'react'
import { Tag } from 'antd'
import { inject, observer } from 'mobx-react'
import { HeaderStore } from '@/store'
import { useLocation, useHistory, Link } from 'umi'
import styles from './style.less'
interface IProps {
  headerStore?: HeaderStore
  route: { routes: any[] }
  children?: React.ReactChildren
}

const TagPanel = (props: IProps) => {
  //!!! 注意，这里必须用 umi 提供的location，不要用window.localtion，因为basename会读取
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const { headerStore, route } = props

  useEffect(() => {
    const router = route?.routes?.find((item: any) => item.path === pathname) || {}
    if (!router.name || !router.path) return
    headerStore.updateTagsPanel({ ...router })
  }, [pathname])

  const onChange = (path: string) => {
    history.push(path)
  }

  const onClose = path => {
    headerStore.updateTagsPanel({ path }, 'remove')
    const { tagsPanel = [] } = headerStore
    //关闭当前标签，回退上一个
    if (path === pathname) {
      const { path } = tagsPanel[tagsPanel.length - 1] || {}
      onChange(path)
    }
  }

  const { tagsPanel = [] } = headerStore
  return tagsPanel.length ? (
    <div className={styles.tagsPanel}>
      {tagsPanel.map(({ path, name }) => (
        <Tag
          className={path === pathname ? styles.active : ''}
          key={name}
          closable={tagsPanel.length !== 1}
          onClose={() => onClose(path)}
        >
          <Link to={path}>{name}</Link>
        </Tag>
      ))}
    </div>
  ) : null
}

export default inject('headerStore')(observer(TagPanel))
