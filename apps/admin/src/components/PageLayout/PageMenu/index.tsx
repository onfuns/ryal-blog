import { useHistory, useStore } from '@/hooks'
import LogoImage from '@/public/images/logo.png'
import { adminRoutes } from '@/routes'
import { Icon } from '@ryal/ui-kit'
import { Menu } from 'antd'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { useState } from 'react'
import './index.less'

const PageMenu = () => {
  const { headerStore } = useStore()
  const { menuCollapsed } = headerStore
  const history = useHistory()
  const [currentRoot] = history.location.pathname.slice(1).split('/')
  const [openKeys, setOpenKeys] = useState([`/${currentRoot}`])

  const menuItems = adminRoutes.map(({ name, path, children, icon }) => {
    const subRoute = children?.map(child => ({
      label: child.name,
      key: child.path,
    }))
    return {
      label: name,
      key: path,
      children: subRoute,
      icon: icon && <Icon name={icon} className="text-16!" />,
    }
  })

  return (
    <div
      className={classnames('relative w-160 flex-shrink-0 bg-#fff', {
        'w-auto': menuCollapsed,
      })}
    >
      <div className="flex items-center text-16 py-16 pl-20 color-#001529 border-right-1-solid-#f0f0f0">
        <img src={LogoImage} className="w-24 h-24" />
        {!menuCollapsed && <h1 className="ml-10 text-18 fw-600">管理后台</h1>}
      </div>
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={menuCollapsed}
          openKeys={openKeys}
          selectedKeys={[history.location.pathname]}
          onOpenChange={keys => setOpenKeys([...keys])}
          items={menuItems}
          onClick={e => history.push(e.key)}
          className="custom-page-menu"
        />
      </div>
    </div>
  )
}

export default observer(PageMenu)
