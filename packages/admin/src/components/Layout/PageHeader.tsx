import { getLocalUser, logoutUser } from '@/actions'
import AvatarImage from '@/public/images/avatar.png'
import { HeaderStore } from '@/store'
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Dropdown } from 'antd'
import { useState } from 'react'

export default function PageHeader({ store }: { store: HeaderStore }) {
  const { menuCollapsed, setMenuCollaps } = store
  const { userName } = getLocalUser()
  const [userMenuCollapsed, setUserMenuCollapsed] = useState(true)

  const MenuIcon = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  const UserMenuIcon = userMenuCollapsed ? DownOutlined : UpOutlined

  return (
    <div className="flex items-center justify-between h-50 px-20 border-bottom-1-solid-#f0f0f0 bg-#fff">
      <MenuIcon onClick={setMenuCollaps} className="text-16" />
      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              icon: <LogoutOutlined className="mr-5" />,
              label: <a onClick={logoutUser}>退出</a>,
            },
          ],
        }}
        trigger={['hover']}
        onOpenChange={setUserMenuCollapsed}
      >
        <span className="flex items-center cursor-pointer color-#000 text-14 gap-8">
          <img src={AvatarImage} className="w-28 rounded-50% h-auto" />
          {userName}
          <UserMenuIcon className="text-12" />
        </span>
      </Dropdown>
    </div>
  )
}
