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

import { AuthCreateReqDtoType, AuthType, ResponseResultType } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth
   * @name GetList
   * @request GET:/api/auth
   */
  getList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: AuthType
      },
      any
    >({
      path: `/api/auth`,
      method: 'GET',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name Add
   * @request POST:/api/auth
   */
  add = (data: AuthCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: AuthType
      },
      any
    >({
      path: `/api/auth`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name Update
   * @request PUT:/api/auth/{id}
   */
  update = (id: string, data: AuthCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: AuthType
      },
      any
    >({
      path: `/api/auth/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name Delete
   * @request DELETE:/api/auth/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/auth/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
