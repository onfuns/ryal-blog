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
  CommentCreateParamsDtoType,
  CommentGetListParamsDtoType,
  CommentType,
  ResponseResultType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Comment<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags comment
   * @name GetList
   * @request GET:/api/comment
   */
  getList = (
    query?: {
      /** 页码 */
      current?: number
      /** 条数 */
      pageSize?: number
      /** 关联文章 id */
      aid?: string
      /** 文章标题 */
      title?: string
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: CommentType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/comment`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment
   * @name Add
   * @request POST:/api/comment
   */
  add = (data: CommentCreateParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
      },
      any
    >({
      path: `/api/comment`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment
   * @name GetClientList
   * @request GET:/api/comment/list
   */
  getClientList = (data: CommentGetListParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: CommentType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/comment/list`,
      method: 'GET',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment
   * @name AddForClient
   * @request POST:/api/comment/add
   */
  addForClient = (data: CommentCreateParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
      },
      any
    >({
      path: `/api/comment/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment
   * @name Update
   * @request PUT:/api/comment/{id}
   */
  update = (id: number, data: CommentCreateParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
      },
      any
    >({
      path: `/api/comment/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment
   * @name Delete
   * @request DELETE:/api/comment/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
      },
      any
    >({
      path: `/api/comment/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
