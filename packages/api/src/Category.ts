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
  CategoryCreateParamsType,
  CategoryListItemType,
  CategoryType,
  CategoryTypeEnumType,
  ResponseResultType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Category<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags category
   * @name GetList
   * @request GET:/api/category
   */
  getList = (
    query?: {
      /** 类型 */
      type?: CategoryTypeEnumType
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: CategoryListItemType[]
      },
      any
    >({
      path: `/api/category`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags category
   * @name Add
   * @request POST:/api/category
   */
  add = (data: CategoryCreateParamsType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CategoryType
      },
      any
    >({
      path: `/api/category`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags category
   * @name GetClientList
   * @request GET:/api/category/list
   */
  getClientList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CategoryListItemType[]
      },
      any
    >({
      path: `/api/category/list`,
      method: 'GET',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags category
   * @name Update
   * @request PUT:/api/category/{id}
   */
  update = (id: number, data: CategoryCreateParamsType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: CategoryType
      },
      any
    >({
      path: `/api/category/${id}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags category
   * @name Delete
   * @request DELETE:/api/category/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/category/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
}
