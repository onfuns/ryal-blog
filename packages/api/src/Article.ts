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

import { ArticleCreateReqDtoType, ArticleType, ResponseResultType } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Article<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags article
   * @name ArticleFindAll
   * @request GET:/api/article
   */
  articleFindAll = (
    query: {
      /** 当前页码 */
      current: number
      /** 当前条数 */
      pageSize: number
      /** 标题 */
      title?: string
      /** 排序 */
      sort?: number
      /** 是否审核通过 0-否 1-是 */
      pass_flag?: number
      /** 分类 id */
      cid: number
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          list?: ArticleType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/article`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleAdd
   * @request POST:/api/article
   */
  articleAdd = (data: ArticleCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: ArticleType
      },
      any
    >({
      path: `/api/article`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleGetClientList
   * @request GET:/api/article/list
   */
  articleGetClientList = (
    query: {
      /** 当前页码 */
      current: number
      /** 当前条数 */
      pageSize: number
      /** 标题 */
      title?: string
      /** 排序 */
      sort?: number
      /** 是否审核通过 0-否 1-是 */
      pass_flag?: number
      /** 分类 id */
      cid: number
    },
    params: RequestParams = {},
  ) =>
    this.request<ArticleType[], any>({
      path: `/api/article/list`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleUpdate
   * @request PUT:/api/article/{id}
   */
  articleUpdate = (id: string, data: ArticleCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: ArticleType
      },
      any
    >({
      path: `/api/article/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleDelete
   * @request DELETE:/api/article/{id}
   */
  articleDelete = (id: string, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/article/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleInfo
   * @request GET:/api/article/{id}
   */
  articleInfo = (id: string, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: {
          list?: ArticleType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/article/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    })
}
