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

import { FileCategoryType, FileType, ResponseResultType } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class File<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags file
   * @name GetList
   * @request GET:/api/file
   */
  getList = (
    query: {
      /** 当前页码 */
      current: number
      /** 当前条数 */
      pageSize: number
      /** 分类 id */
      fileCategoryId: number
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: FileType
      },
      any
    >({
      path: `/api/file`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file
   * @name Delete
   * @request DELETE:/api/file/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/file/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file
   * @name UploadMultiple
   * @request POST:/api/file/upload
   */
  uploadMultiple = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/file/upload`,
      method: 'POST',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file
   * @name FindFileCategory
   * @request GET:/api/file/category
   */
  findFileCategory = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: FileCategoryType
      },
      any
    >({
      path: `/api/file/category`,
      method: 'GET',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file
   * @name AddFileCategory
   * @request POST:/api/file/category
   */
  addFileCategory = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: FileCategoryType
      },
      any
    >({
      path: `/api/file/category`,
      method: 'POST',
      format: 'json',
      ...params,
    })
}
