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

import { ResponseResultType, WebsiteCreateReqDtoType, WebsiteType } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Website<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags website
   * @name GetList
   * @request GET:/api/website
   */
  getList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: WebsiteType[]
      },
      any
    >({
      path: `/api/website`,
      method: 'GET',
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags website
   * @name Update
   * @request POST:/api/website
   */
  update = (data: WebsiteCreateReqDtoType, params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: WebsiteType[]
      },
      any
    >({
      path: `/api/website`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags website
   * @name GetClientList
   * @request GET:/api/website/list
   */
  getClientList = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: WebsiteType
      },
      any
    >({
      path: `/api/website/list`,
      method: 'GET',
      format: 'json',
      ...params,
    })
}
