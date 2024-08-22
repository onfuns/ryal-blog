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
  FileCategoryCreateReqDtoType,
  FileCategoryType,
  FileType,
  FileUploadReqDtoType,
  ResponseResultType,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class File<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags file
   * @name GetList
   * @request GET:/api/file
   */
  getList = (
    query?: {
      /** 页码 */
      current?: number
      /** 条数 */
      pageSize?: number
      /** 分类 id */
      fileCategoryId?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<
      ResponseResultType & {
        data?: {
          data?: FileType[]
          total?: number
        }
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
  delete = (id: number, params: RequestParams = {}) =>
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
   * @name Upload
   * @request POST:/api/file/upload
   */
  upload = (data: FileUploadReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        /** @default null */
        data?: null
      },
      any
    >({
      path: `/api/file/upload`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file
   * @name GetFileCategoryList
   * @request GET:/api/file/category
   */
  getFileCategoryList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: FileCategoryType[]
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
  addFileCategory = (data: FileCategoryCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: FileCategoryType
      },
      any
    >({
      path: `/api/file/category`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
