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
  ResponseResultType,
  TagCreateParamsDtoType,
  TagGetListParamsDtoType,
  TagType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Tag<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tag
   * @name GetList
   * @request GET:/api/tag
   */
  getList = (data: TagGetListParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: TagType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/tag`,
      method: 'GET',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags tag
   * @name Add
   * @request POST:/api/tag
   */
  add = (data: TagCreateParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: TagType
      },
      any
    >({
      path: `/api/tag`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags tag
   * @name Update
   * @request PUT:/api/tag/{id}
   */
  update = (id: number, data: TagCreateParamsDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: TagType
      },
      any
    >({
      path: `/api/tag/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags tag
   * @name Delete
   * @request DELETE:/api/tag/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/tag/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
