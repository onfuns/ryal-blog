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

/**
 * 类型
 * @default "list"
 */
export enum CategoryTypeEnumType {
  List = 'list',
  Page = 'page',
  Url = 'url',
}

/**
 * 显示状态
 * @default "enable"
 */
export enum CategoryStatusEnumType {
  Enable = 'enable',
  Block = 'block',
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
  /** 类型 */
  type: CategoryTypeEnumType
  /** 显示状态 */
  status: CategoryStatusEnumType
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

/**
 * 是否审核通过
 * @default "un_audited"
 */
export enum ArticlePassStatusEnumType {
  Audited = 'audited',
  UnAudited = 'un_audited',
}

/**
 * 是否开放评论
 * @default "closed"
 */
export enum ArticleCommentStatusEnumType {
  Opened = 'opened',
  Closed = 'closed',
}

/**
 * 编辑器类型
 * @default "markdown"
 */
export enum ArticleEditorTypeEnumType {
  Markdown = 'markdown',
  Text = 'text',
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
  /** 是否审核通过 */
  pass_status: ArticlePassStatusEnumType
  /** 是否开放评论 */
  comment_status: ArticleCommentStatusEnumType
  /** 编辑器类型 */
  editor_type: ArticleEditorTypeEnumType
  /**
   * 发布时间
   * @format date-time
   */
  publish_time: string
  /** 作者 */
  author: string
}

export interface ArticleGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 标题 */
  title?: string
  /** 排序 */
  sort?: number
  /** 是否审核通过 */
  pass_status?: ArticlePassStatusEnumType
  /** 分类 id */
  cid?: number
}

export interface PickTypeClassType {
  /** id */
  id: number
}

export interface ArticleCreateParamsDtoType {
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
  /** 是否审核通过 */
  pass_status?: ArticlePassStatusEnumType
  /** 是否开放评论 */
  comment_status?: ArticleCommentStatusEnumType
  /** 编辑器类型 */
  editor_type?: ArticleEditorTypeEnumType
  /**
   * 发布时间
   * @format date-time
   */
  publish_time?: string
  /** 作者 */
  author?: string
  /** 标签 id */
  tagIds?: PickTypeClassType[]
}

export interface TagGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 名称 */
  name?: string
}

export interface TagCreateParamsDtoType {
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
  /** 类型 */
  type: CategoryTypeEnumType
  /** 显示状态 */
  status: CategoryStatusEnumType
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

export interface CategoryCreateParamsDtoType {
  /** 分类名称 */
  name?: string
  /** 分类路由 */
  ename?: string
  /**
   * 父级ID
   * @default 0
   */
  pid?: number
  /** 类型 */
  type?: CategoryTypeEnumType
  /** 显示状态 */
  status?: CategoryStatusEnumType
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

/**
 * 节点类型
 * @default "menu"
 */
export enum AuthNodeTypeEnumType {
  Menu = 'menu',
  Action = 'action',
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
  /** 节点类型 */
  node_type: AuthNodeTypeEnumType
  /**
   * 父级节点 id
   * @default 0
   */
  pid: number
}

/**
 * 状态
 * @default "enable"
 */
export enum RoleStatusEnumType {
  Enable = 'enable',
  Block = 'block',
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
  auths: AuthType[]
  /** 状态 */
  status: RoleStatusEnumType
}

/**
 * 状态
 * @default "enable"
 */
export enum UserStatusEnumType {
  Enable = 'enable',
  Block = 'block',
}

/**
 * 身份
 * @default "normal"
 */
export enum UserIdentityEnumType {
  Super = 'super',
  Normal = 'normal',
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
  /** 状态 */
  status: UserStatusEnumType
  /** 身份 */
  identity: UserIdentityEnumType
  /** 上次登录 ip */
  last_login_ip: string
  /** 上次登录时间 */
  last_login_at: string
}

export interface UserLoginParamsDtoType {
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
}

export interface UserGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 状态 */
  status?: UserStatusEnumType
  /** 用户名 */
  name?: string
  /** 角色 id */
  roleId?: string
}

export interface UserCreateParamsDtoType {
  /** 名称 */
  name?: string
  /** 密码 */
  password?: string
  /** 角色 */
  roles?: RoleType[]
  /** 状态 */
  status?: UserStatusEnumType
  /** 身份 */
  identity?: UserIdentityEnumType
  /** 上次登录 ip */
  last_login_ip?: string
  /** 上次登录时间 */
  last_login_at?: string
}

export interface RoleGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 名称 */
  name?: string
  /** 状态 */
  status?: RoleStatusEnumType
}

export interface RoleCreateParamsDtoType {
  /** 名称 */
  name?: string
  /** 描述 */
  description?: string
  /** 权限节点 id */
  auths?: AuthType[]
  /** 状态 */
  status?: RoleStatusEnumType
}

export interface AuthCreateParamsDtoType {
  /** 权限名称 */
  name?: string
  /** 权限编码 */
  code?: string
  /** 节点类型 */
  node_type?: AuthNodeTypeEnumType
  /**
   * 父级节点 id
   * @default 0
   */
  pid?: number
}

/**
 * 状态
 * @default "un_audited"
 */
export enum CommentStatusEnumType {
  Passed = 'passed',
  UnAudited = 'un_audited',
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
  /** 状态 */
  status: CommentStatusEnumType
}

export interface CommentGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 关联文章 id */
  aid?: string
  /** 文章标题 */
  title?: string
}

export interface CommentCreateParamsDtoType {
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
  /** 状态 */
  status?: CommentStatusEnumType
}

export interface DashboardDataArticleListResultType {
  /** 文章列表 */
  data: ArticleType[]
  /** 总数 */
  total: number
}

export interface DashboardDataCommentListResultType {
  /** 评论列表 */
  data: CommentType[]
  /** 总数 */
  total: number
}

export interface DashboardDataResultDtoType {
  /** 文章列表 */
  article: DashboardDataArticleListResultType
  /** 评论列表 */
  comment: DashboardDataCommentListResultType
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

export interface FileGetListParamsDtoType {
  /** 页码 */
  current?: number
  /** 条数 */
  pageSize?: number
  /** 分类 id */
  fileCategoryId?: number
}

export interface FileUploadParamsDtoType {
  files: File[]
  /** 文件分类 */
  fileCategoryId?: number
}

export interface FileCategoryCreateParamsDtoType {
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

export interface WebsiteCreateItemDtoType {
  /** 名称 */
  name?: string
  /** 值 */
  value?: string
}

export interface WebsiteCreateParamsDtoType {
  /** 全局配置列表 */
  list: WebsiteCreateItemDtoType[]
}
