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

import { ResponseResultType, RoleCreateReqDtoType, RoleType } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Role<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags role
   * @name GetList
   * @request GET:/api/role
   */
  getList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: RoleType
      },
      any
    >({
      path: `/api/role`,
      method: 'GET',
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
  update = (id: string, data: RoleCreateReqDtoType, params: RequestParams = {}) =>
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
  delete = (id: string, params: RequestParams = {}) =>
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
