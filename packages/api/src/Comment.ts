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

import { CommentCreateReqDtoType, CommentType, ResponseResultType } from './data-contracts'
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
    query: {
      /** 当前页码 */
      current: number
      /** 当前条数 */
      pageSize: number
      /** 文章标题 */
      title: string
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
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
  add = (data: CommentCreateReqDtoType, params: RequestParams = {}) =>
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
  getClientList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CommentType
      },
      any
    >({
      path: `/api/comment/list`,
      method: 'GET',
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
  addForClient = (data: CommentCreateReqDtoType, params: RequestParams = {}) =>
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
  update = (id: string, data: CommentCreateReqDtoType, params: RequestParams = {}) =>
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
  delete = (id: string, params: RequestParams = {}) =>
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
