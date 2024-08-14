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

import { CreateDtoTypes } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Article<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags article
   * @name ArticleFindAll
   * @request GET:/api/article
   */
  articleFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/article`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleAdd
   * @request POST:/api/article
   */
  articleAdd = (data: CreateDtoTypes, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/article`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleGetClientList
   * @request GET:/api/article/list
   */
  articleGetClientList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/article/list`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags article
   * @name ArticleUpdate
   * @request PUT:/api/article/{id}
   */
  articleUpdate = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/article/${id}`,
      method: 'PUT',
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
    this.request<void, any>({
      path: `/api/article/${id}`,
      method: 'DELETE',
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
    this.request<void, any>({
      path: `/api/article/${id}`,
      method: 'GET',
      ...params,
    })
}
