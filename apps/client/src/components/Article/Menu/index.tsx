import { useStore } from '@/hooks'
import { CategoryTypeEnumType, type CategoryType } from '@/service'
import { Icon } from '@ryal/ui-kit'
import classnames from 'classnames'
import { observer } from 'mobx-react'
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
  const { webSiteStore } = useStore()
  const { websiteInfo } = webSiteStore

  const isOutUrl = (url?: string) => url && /^https?/.test(url)

  const renderIcon = ({ icon, icon_color }: ArticleMenuItemType) => {
    if (!icon) return null
    if (isOutUrl(icon))
      return <Image className="mr-8" src={icon} width={16} height={16} alt="icon" />
    return <Icon name={icon} style={{ color: icon_color }} className="mr-8" />
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
          className="flex items-center color-#333 py-10 pl-12"
          {...(isOutUrl(item.url) ? { target: '_blank' } : {})}
        >
          {renderIcon(item)}
          <span>{item.name}</span>
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

  const outerMenu: ArticleMenuItemType[] = []
  const innerMenu = data?.filter(item => {
    const url = isOutUrl(item.url)
    if (url) outerMenu.push(item)
    return !url
  })

  return (
    <div className="sticky top-20 w-200 max-h-450 mr-10 flex-shrink-0">
      {[innerMenu, outerMenu].map((group, index) => (
        <ul key={index} className="bg-#fff p-10 mb-10 rd-4 overflow-hidden">
          {renderMenu(group)}
        </ul>
      ))}
    </div>
  )
}

export default observer(ArticleMenu)
