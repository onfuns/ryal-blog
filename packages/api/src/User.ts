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
  UserCreateParamsType,
  UserLoginParamsType,
  UserStatusEnumType,
  UserType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name Login
   * @request POST:/api/user/login
   */
  login = (data: UserLoginParamsType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: UserType
      },
      any
    >({
      path: `/api/user/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user
   * @name GetList
   * @request GET:/api/user
   */
  getList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: UserType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/user`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user
   * @name Add
   * @request POST:/api/user
   */
  add = (data: UserCreateParamsType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: UserType
      },
      any
    >({
      path: `/api/user`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user
   * @name Update
   * @request PUT:/api/user/{id}
   */
  update = (id: number, data: UserCreateParamsType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: UserType
      },
      any
    >({
      path: `/api/user/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user
   * @name Delete
   * @request DELETE:/api/user/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: UserType
      },
      any
    >({
      path: `/api/user/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
