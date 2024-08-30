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
  ArticleListReqDtoType,
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
  getList = (data: ArticleListReqDtoType, params: RequestParams = {}) =>
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
      body: data,
      type: ContentType.Json,
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
  getClientList = (data: ArticleListReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: ArticleType
      },
      any
    >({
      path: `/api/article/list`,
      method: 'GET',
      body: data,
      type: ContentType.Json,
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
