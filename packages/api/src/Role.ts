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
  RoleCreateReqDtoType,
  RoleStatusEnumType,
  RoleType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Role<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags role
   * @name GetList
   * @request GET:/api/role
   */
  getList = (
    query?: {
      /** 页码 */
      current?: number
      /** 条数 */
      pageSize?: number
      /** 名称 */
      name?: string
      /** 状态 */
      status?: RoleStatusEnumType
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: RoleType[]
          total?: number
        }
      },
      any
    >({
      path: `/api/role`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags role
   * @name Add
   * @request POST:/api/role
   */
  add = (data: RoleCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: RoleType
      },
      any
    >({
      path: `/api/role`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags role
   * @name Update
   * @request PUT:/api/role/{id}
   */
  update = (id: number, data: RoleCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: RoleType
      },
      any
    >({
      path: `/api/role/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags role
   * @name Delete
   * @request DELETE:/api/role/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: RoleType
      },
      any
    >({
      path: `/api/role/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
