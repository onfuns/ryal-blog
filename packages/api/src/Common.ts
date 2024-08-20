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

import { DashboardDataResDtoType, ResponseResultType } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Common<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags common
   * @name GetDashboardData
   * @request GET:/api/common/dashboard
   */
  getDashboardData = (params: RequestParams = {}) =>
    this.request<
      ResponseResultType & {
        data?: DashboardDataResDtoType
      },
      any
    >({
      path: `/api/common/dashboard`,
      method: 'GET',
      format: 'json',
      ...params,
    })
}
