import { LazyExoticComponent, lazy } from 'react'

export type IRouter<T extends React.FunctionComponent<any> = any> = {
  /** 路由名称 */
  name?: string
  /** 路由路径 */
  path: string
  /** 路由重定向 */
  redirect?: string
  /** 路由组件 */
  component?: LazyExoticComponent<T> | React.Component
  /** 路由子集 */
  children?: IRouter<T>[]
  /** 图标 */
  icon?: string
  /** 路由属性 */
  meta?: {
    /** 是否标签化 */
    tag?: boolean
    /** 是否显示布局 */
    layout?: boolean
  }
}

export const adminRoutes: IRouter[] = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'icon-home',
    component: lazy(() => import('@/pages/dashboard')),
  },
  {
    name: '内容管理',
    path: '/portal',
    icon: 'icon-application-record',
    children: [
      {
        name: '栏目管理',
        path: '/portal/category',
        component: lazy(() => import('@/pages/category')),
      },
      {
        name: '文章管理',
        path: '/portal/article',
        component: lazy(() => import('@/pages/article')),
      },
      {
        name: '标签管理',
        path: '/portal/tag',
        component: lazy(() => import('@/pages/tag')),
      },
      {
        name: '评论管理',
        path: '/portal/comment',
        component: lazy(() => import('@/pages/comment')),
      },
      {
        name: '附件管理',
        path: '/portal/file',
        component: lazy(() => import('@/pages/file')),
      },
    ],
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'icon-customer-management',
    children: [
      {
        name: '用户管理',
        path: '/user/manage',
        component: lazy(() => import('@/pages/user')),
      },
      {
        name: '角色管理',
        path: '/user/role',
        component: lazy(() => import('@/pages/role')),
      },
      {
        name: '权限管理',
        path: '/user/auth',
        component: lazy(() => import('@/pages/auth')),
      },
    ],
  },
  {
    name: '系统管理',
    path: '/setting',
    icon: 'icon-settings',
    children: [
      {
        name: '站点设置',
        path: '/setting/website',
        component: lazy(() => import('@/pages/website')),
      },
    ],
  },
]

const mergeFlatRoutes = (data: IRouter[], flatRoutes: IRouter[] = []): IRouter[] => {
  data.map(({ name, path, component, children, ...other }) => {
    component && flatRoutes.push({ name, path, component, ...other })
    if (children) mergeFlatRoutes(children, flatRoutes)
  })
  return flatRoutes
}

export const routes: IRouter[] = [
  {
    path: '/login',
    component: lazy(() => import('@/pages/login')),
    meta: { layout: false },
  },
  ...mergeFlatRoutes(adminRoutes),
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
]
