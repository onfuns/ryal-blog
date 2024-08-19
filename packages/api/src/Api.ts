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

import { CategoryType, RoleType, TagType, UserType } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name FindAll
   * @request GET:/api/tag
   */
  findAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Add
   * @request POST:/api/tag
   */
  add = (data: TagType, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @name Update
   * @request PUT:/api/tag/{id}
   */
  update = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete
   * @request DELETE:/api/tag/{id}
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll2
   * @request GET:/api/category
   * @originalName findAll
   * @duplicate
   */
  findAll2 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Add2
   * @request POST:/api/category
   * @originalName add
   * @duplicate
   */
  add2 = (data: CategoryType, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @name ListForClient
   * @request GET:/api/category/list
   */
  listForClient = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/list`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Update2
   * @request PUT:/api/category/{id}
   * @originalName update
   * @duplicate
   */
  update2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete2
   * @request DELETE:/api/category/{id}
   * @originalName delete
   * @duplicate
   */
  delete2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name Login
   * @request POST:/api/user/login
   */
  login = (data: UserType, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll3
   * @request GET:/api/user
   * @originalName findAll
   * @duplicate
   */
  findAll3 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Add3
   * @request POST:/api/user
   * @originalName add
   * @duplicate
   */
  add3 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name Update3
   * @request PUT:/api/user/{id}
   * @originalName update
   * @duplicate
   */
  update3 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete3
   * @request DELETE:/api/user/{id}
   * @originalName delete
   * @duplicate
   */
  delete3 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll4
   * @request GET:/api/role
   * @originalName findAll
   * @duplicate
   */
  findAll4 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Add4
   * @request POST:/api/role
   * @originalName add
   * @duplicate
   */
  add4 = (data: RoleType, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @name Update4
   * @request PUT:/api/role/{id}
   * @originalName update
   * @duplicate
   */
  update4 = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete4
   * @request DELETE:/api/role/{id}
   * @originalName delete
   * @duplicate
   */
  delete4 = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll5
   * @request GET:/api/comment
   * @originalName findAll
   * @duplicate
   */
  findAll5 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Add5
   * @request POST:/api/comment
   * @originalName add
   * @duplicate
   */
  add5 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name GetClientList
   * @request GET:/api/comment/list
   */
  getClientList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/list`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name AddForClient
   * @request POST:/api/comment/add
   */
  addForClient = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/add`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name Update5
   * @request PUT:/api/comment/{id}
   * @originalName update
   * @duplicate
   */
  update5 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete5
   * @request DELETE:/api/comment/{id}
   * @originalName delete
   * @duplicate
   */
  delete5 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name FindDashboardData
   * @request GET:/api/common/dashboard
   */
  findDashboardData = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/common/dashboard`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll6
   * @request GET:/api/file
   * @originalName findAll
   * @duplicate
   */
  findAll6 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name FindFileType
   * @request GET:/api/file/type
   */
  findFileType = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/type`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name AddFileType
   * @request POST:/api/file/type
   */
  addFileType = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/type`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name Delete6
   * @request DELETE:/api/file/{id}
   * @originalName delete
   * @duplicate
   */
  delete6 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name UploadMultiple
   * @request POST:/api/file/upload
   */
  uploadMultiple = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/upload`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name FindAll7
   * @request GET:/api/website
   * @originalName findAll
   * @duplicate
   */
  findAll7 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name Update6
   * @request POST:/api/website
   * @originalName update
   * @duplicate
   */
  update6 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name GetClientList2
   * @request GET:/api/website/info
   * @originalName getClientList
   * @duplicate
   */
  getClientList2 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website/info`,
      method: 'GET',
      ...params,
    })
}
