/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ResponseResultType {
  /** 响应成功 */
  success: boolean
  /** 响应描述 */
  message: string
  /** 响应编码 */
  code: string
  /** 响应结果 */
  data: object
}

export interface CategoryType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 路由 */
  ename: string
  /**
   * 父级ID
   * @default 0
   */
  pid: number
  /**
   * 类型 1-文章列表,2-单页,3-外链
   * @default 1
   */
  type: number
  /** 状态 1-显示 0-隐藏 */
  status: number
  /**
   * 排序
   * @default 0
   */
  sort: number
  /** 外链地址 */
  url: string
  /** 图标 */
  icon: string
  /** 图标颜色 */
  icon_color: string
}

export interface TagType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 描述 */
  description: string
}

export interface ArticleType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: string
  /** 分类 */
  category: CategoryType
  /** 分类ID */
  category_id: number
  /** 标签 */
  tags: TagType[]
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 排序 */
  sort: number
  /** 内容 */
  content: string
  /**
   * 是否审核通过 0-否 1-是
   * @default 1
   */
  pass_flag: number
  /**
   * 是否评论 0-否 1-是
   * @default 0
   */
  comment_flag: number
  /** 发布时间 */
  publish_time: string
  /** 作者 */
  author: string
}

export interface ArticleCreateReqDtoType {
  /** 分类 */
  category?: CategoryType
  /** 分类ID */
  category_id?: number
  /** 标签 */
  tags?: TagType[]
  /** 文章标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 排序 */
  sort?: number
  /** 文章内容 */
  content?: string
  /**
   * 是否审核通过 0-否 1-是
   * @default 1
   */
  pass_flag?: number
  /**
   * 是否评论 0-否 1-是
   * @default 0
   */
  comment_flag?: number
  /** 发布时间 */
  publish_time?: string
  /** 作者 */
  author?: string
}

export interface TagCreateReqDtoType {
  /** 名称 */
  name?: string
  /** 描述 */
  description?: string
}

export interface CategoryListItemDtoType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 路由 */
  ename: string
  /**
   * 父级ID
   * @default 0
   */
  pid: number
  /**
   * 类型 1-文章列表,2-单页,3-外链
   * @default 1
   */
  type: number
  /** 状态 1-显示 0-隐藏 */
  status: number
  /**
   * 排序
   * @default 0
   */
  sort: number
  /** 外链地址 */
  url: string
  /** 图标 */
  icon: string
  /** 图标颜色 */
  icon_color: string
  /** 子类 */
  children: string[]
}

export interface CategoryCreateReqDtoType {
  /** 分类名称 */
  name?: string
  /** 分类路由 */
  ename?: string
  /**
   * 父级ID
   * @default 0
   */
  pid?: number
  /**
   * 类型 1-文章列表,2-单页,3-外链
   * @default 1
   */
  type?: number
  /** 状态 1-显示 0-隐藏 */
  status?: number
  /**
   * 排序
   * @default 0
   */
  sort?: number
  /** 外链地址 */
  url?: string
  /** 图标 */
  icon?: string
  /** 图标颜色 */
  icon_color?: string
}

export interface RoleType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 描述 */
  description: string
  /** 权限节点 id */
  auths: string[]
  /**
   * 状态 0-停用 1-启用
   * @default 1
   */
  enable: number
}

export interface UserType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
  /** 角色 */
  roles: RoleType[]
  /**
   * 状态 0-停用 1-启用
   * @default 1
   */
  enable: number
  /**
   * 是否超级管理员
   * @default 0
   */
  super: number
  /** 上次登录 ip */
  last_login_ip: string
  /** 上次登录时间 */
  last_login_at: string
}

export interface UserLoginReqDtoType {
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
}

export interface UserCreateReqDtoType {
  /** 名称 */
  name?: string
  /** 密码 */
  password?: string
  /** 角色 */
  roles?: RoleType[]
  /**
   * 状态 0-停用 1-启用
   * @default 1
   */
  enable?: number
  /**
   * 是否超级管理员
   * @default 0
   */
  super?: number
  /** 上次登录 ip */
  last_login_ip?: string
  /** 上次登录时间 */
  last_login_at?: string
}

export interface RoleCreateReqDtoType {
  /** 名称 */
  name?: string
  /** 描述 */
  description?: string
  /** 权限节点 id */
  auths?: string[]
  /**
   * 状态 0-停用 1-启用
   * @default 1
   */
  enable?: number
}

export interface AuthType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 编码 */
  code: string
  /** 类型 1-菜单 2-功能 */
  type: number
  /**
   * 父级节点 id
   * @default 0
   */
  pid: number
}

export interface AuthCreateReqDtoType {
  /** 权限名称 */
  name?: string
  /** 权限编码 */
  code?: string
  /** 类型 1-菜单 2-功能 */
  type?: number
  /**
   * 父级节点 id
   * @default 0
   */
  pid?: number
}

export interface CommentType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 昵称 */
  name: string
  /** 内容 */
  content: string
  /** 回复内容 */
  reply: string
  /** 网址 */
  url: string
  /** 关联文章 id */
  aid: string
  /** 关联文章 */
  article: ArticleType
  /**
   * 状态 0-未审核 1-通过
   * @default 0
   */
  status: number
}

export interface CommentCreateReqDtoType {
  /** 昵称 */
  name?: string
  /** 内容 */
  content?: string
  /** 回复内容 */
  reply?: string
  /** 网址 */
  url?: string
  /** 关联文章 id */
  aid?: string
  /** 关联文章 */
  article?: ArticleType
  /**
   * 状态 0-未审核 1-通过
   * @default 0
   */
  status?: number
}

export interface DashboardDataArticleListResType {
  /** 文章列表 */
  data: ArticleType[]
  /** 总数 */
  total: number
}

export interface DashboardDataCommentListResType {
  /** 评论列表 */
  data: CommentType[]
  /** 总数 */
  total: number
}

export interface DashboardDataResDtoType {
  /** 文章列表 */
  article: DashboardDataArticleListResType
  /** 评论列表 */
  comment: DashboardDataCommentListResType
  /** 用户信息 */
  user: UserType
}

export interface FileCategoryType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
}

export interface FileType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 分类 */
  fileCategory: FileCategoryType
  /** 分类 id */
  file_category_id: number
  /** 原名称 */
  originalname: string
  /** 地址 */
  url: string
  /** 大小 */
  size: number
  /** 后缀 */
  ext: string
}

export interface FileUploadReqDtoType {
  files: File[]
  /** 文件分类 */
  fileCategoryId?: number
}

export interface FileCategoryCreateReqDtoType {
  /** 名称 */
  name: string
}

export interface WebsiteType {
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 值 */
  value: string
}

export interface WebsiteCreateReqDtoType {
  /** 名称 */
  name?: string
  /** 值 */
  value?: string
}
