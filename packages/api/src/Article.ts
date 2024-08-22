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

import {
  ArticleCreateReqDtoType,
  ArticlePassStatusEnumType,
  ArticleType,
  ResponseResultType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Article<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags article
   * @name GetList
   * @request GET:/api/article
   */
  getList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: ArticleType[]
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
   * @name Add
   * @request POST:/api/article
   */
  add = (data: ArticleCreateReqDtoType, params: RequestParams = {}) =>
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
   * @name GetClientList
   * @request GET:/api/article/list
   */
  getClientList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: ArticleType
      },
      any
    >({
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
   * @name Update
   * @request PUT:/api/article/{id}
   */
  update = (id: string, data: ArticleCreateReqDtoType, params: RequestParams = {}) =>
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
   * @name Delete
   * @request DELETE:/api/article/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
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
   * @name Info
   * @request GET:/api/article/{id}
   */
  info = (id: string, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: ArticleType
      },
      any
    >({
      path: `/api/article/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    })
}
