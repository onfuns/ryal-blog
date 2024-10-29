import { useStore } from '@/hooks'
import AvatarImage from '@/public/images/avatar.png'
import { userService } from '@/service'
import { Icon } from '@ryal/ui-kit'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react'
import { useState } from 'react'

const PageHeader = () => {
  const { headerStore } = useStore()
  const { setMenuCollapsed } = headerStore
  const { userName } = userService.getLocalUser()
  const [userMenuCollapsed, setUserMenuCollapsed] = useState(true)

  return (
    <div className="flex items-center justify-between h-50 px-20 border-bottom-1-solid-#f0f0f0 bg-#fff">
      <Icon name="icon-menu" onClick={setMenuCollapsed} className="text-16 cursor-pointer" />
      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              icon: <Icon name="icon-logout" className="mr-5" />,
              label: <a onClick={userService.logout}>退出</a>,
            },
          ],
        }}
        trigger={['hover']}
        onOpenChange={setUserMenuCollapsed}
      >
        <span className="flex items-center cursor-pointer color-#000 text-14 gap-8">
          <img src={AvatarImage} className="w-28 rounded-50% h-auto" />
          {userName}
          <Icon name={userMenuCollapsed ? 'icon-down' : 'icon-up'} />
        </span>
      </Dropdown>
    </div>
  )
}

export default observer(PageHeader)
