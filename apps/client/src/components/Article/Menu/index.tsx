import config from '@/config'
import { CategoryTypeEnumType, type CategoryType } from '@/service'
import { Icon } from '@ryal/ui-kit'
import classnames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import './index.less'

export type ArticleMenuItemType = Partial<CategoryType> & {
  children?: ArticleMenuItemType[]
}
export type ArticleMenuPropsType = {
  data: ArticleMenuItemType[]
}

const ArticleMenu = ({ data = [] }: ArticleMenuPropsType) => {
  const router = useRouter()

  const renderIcon = ({ icon, icon_color }: ArticleMenuItemType) => {
    if (!icon) return null
    if (/^https?/.test(icon))
      return <Image className="mr-8" src={icon} width={16} height={16} alt="" />
    return <Icon name={icon} style={{ color: icon_color }} />
  }

  const renderMenu = (data: ArticleMenuItemType[]) => {
    const renderMenuItem = (item: ArticleMenuItemType, children: ArticleMenuItemType[] = []) => (
      <li
        key={item.name}
        className={classnames('page-menu-item', 'cursor-pointer relative', {
          active: router.asPath === `/category${item.ename}` || router.asPath === item.url,
        })}
      >
        <a
          href={item.type === CategoryTypeEnumType.Url ? item.url : `/category${item.ename}`}
          className="flex items-center color-#333 py-10 pl-12 lh-20"
        >
          {renderIcon(item)}
          {item.name}
        </a>
        {!!children?.length && (
          <ul className="block min-w-160 bg-#fff rd-4">
            {children.map(child => renderMenuItem(child, child.children))}
          </ul>
        )}
      </li>
    )
    return data.map(item => renderMenuItem(item, item.children))
  }

  const defauluMenu: ArticleMenuItemType[] = [
    {
      name: '首页',
      type: CategoryTypeEnumType.Url,
      url: '/',
      icon: 'icon-shouye1',
      icon_color: '#F15533',
    },
  ]
  const otherMenu: ArticleMenuItemType[] = [
    {
      name: '前端导航',
      type: CategoryTypeEnumType.Url,
      url: config.gitUrl,
      icon: 'icon-huaban',
      icon_color: '#12b7f5',
    },
  ]

  return (
    <div className="sticky top-50 w-200 max-h-450 mr-10 flex-shrink-0">
      {[defauluMenu.concat(data), otherMenu].map((group, index) => (
        <ul key={index} className="bg-#fff p-10 mb-10 rd-4 overflow-hidden">
          {renderMenu(group)}
        </ul>
      ))}
    </div>
  )
}

export default ArticleMenu
