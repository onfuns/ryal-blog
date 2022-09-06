import { Menu, Dropdown } from 'antd'
import { getLocalUser, logoutUser } from '@/actions/user'
import styles from './style.module.less'
import { LogoutOutlined } from '@ant-design/icons'
import AvatarImage from '@/assets/images/avatar.png'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'

export default observer(() => {
  const { headerStore } = useStore()
  const { userName } = getLocalUser()
  const MenuIcon = headerStore.menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  return (
    <div className={styles.header}>
      <div>
        <MenuIcon onClick={() => headerStore.setMenuCollaps()} style={{ fontSize: 17 }} />
      </div>
      <div className={styles.tools}>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: 1,
                  icon: <LogoutOutlined style={{ marginRight: 5 }} />,
                  label: <a onClick={logoutUser}>退出</a>,
                },
              ]}
            ></Menu>
          }
          trigger={['click']}
        >
          <div className={styles.username}>
            <img src={AvatarImage} className={styles.avatar} />
            {userName}
          </div>
        </Dropdown>
      </div>
    </div>
  )
})
