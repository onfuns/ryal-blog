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

export type CategoryType = object

export interface ArticleType {
  /** id */
  id: string
  /** 分类 */
  category: CategoryType
  /** 分类ID */
  category_id: number
  /** 标签 */
  tags: string[]
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 排序 */
  sort: string
  /** 内容 */
  content: string
  /** 是否审核通过 0-否 1-是 */
  pass_flag: number
  /** 是否评论 0-否 1-是 */
  comment_flag: number
  /** 发布时间 */
  publish_time: string
  /** 作者 */
  author: string
  /** 创建时间 */
  created_at: string
  /** 更新时间 */
  updated_at: string
}

export interface ArticleListResType {
  /** 列表数据 */
  data: ArticleType[]
  /** 总数 */
  count: number
}

export interface ArticleCreateReqType {
  title: string
  content: string
}

export type TagType = object

export type UserType = object

export type RoleType = object
