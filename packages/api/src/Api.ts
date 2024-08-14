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
   * @name TagFindAll
   * @request GET:/api/tag
   */
  tagFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name TagAdd
   * @request POST:/api/tag
   */
  tagAdd = (data: TagType, params: RequestParams = {}) =>
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
   * @name TagUpdate
   * @request PUT:/api/tag/{id}
   */
  tagUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name TagDelete
   * @request DELETE:/api/tag/{id}
   */
  tagDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/tag/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name CategoryFindAll
   * @request GET:/api/category
   */
  categoryFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name CategoryAdd
   * @request POST:/api/category
   */
  categoryAdd = (data: CategoryType, params: RequestParams = {}) =>
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
   * @name CategoryListForClient
   * @request GET:/api/category/list
   */
  categoryListForClient = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/list`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name CategoryUpdate
   * @request PUT:/api/category/{id}
   */
  categoryUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name CategoryDelete
   * @request DELETE:/api/category/{id}
   */
  categoryDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/category/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name UserLogin
   * @request POST:/api/user/login
   */
  userLogin = (data: UserType, params: RequestParams = {}) =>
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
   * @name UserFindAll
   * @request GET:/api/user
   */
  userFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name UserAdd
   * @request POST:/api/user
   */
  userAdd = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name UserUpdate
   * @request PUT:/api/user/{id}
   */
  userUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name UserDelete
   * @request DELETE:/api/user/{id}
   */
  userDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name RoleFindAll
   * @request GET:/api/role
   */
  roleFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name RoleAdd
   * @request POST:/api/role
   */
  roleAdd = (data: RoleType, params: RequestParams = {}) =>
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
   * @name RoleUpdate
   * @request PUT:/api/role/{id}
   */
  roleUpdate = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name RoleDelete
   * @request DELETE:/api/role/{id}
   */
  roleDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/role/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name AuthFindAll
   * @request GET:/api/auth
   */
  authFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name AuthAdd
   * @request POST:/api/auth
   */
  authAdd = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name AuthUpdate
   * @request PUT:/api/auth/{id}
   */
  authUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name AuthDelete
   * @request DELETE:/api/auth/{id}
   */
  authDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentFindAll
   * @request GET:/api/comment
   */
  commentFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentAdd
   * @request POST:/api/comment
   */
  commentAdd = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentGetClientList
   * @request GET:/api/comment/list
   */
  commentGetClientList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/list`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentAddForClient
   * @request POST:/api/comment/add
   */
  commentAddForClient = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/add`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentUpdate
   * @request PUT:/api/comment/{id}
   */
  commentUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/${id}`,
      method: 'PUT',
      ...params,
    })
  /**
   * No description
   *
   * @name CommentDelete
   * @request DELETE:/api/comment/{id}
   */
  commentDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/comment/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name CommonFindDashboardData
   * @request GET:/api/common/dashboard
   */
  commonFindDashboardData = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/common/dashboard`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name FileFindAll
   * @request GET:/api/file
   */
  fileFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name FileFindFileType
   * @request GET:/api/file/type
   */
  fileFindFileType = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/type`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name FileAddFileType
   * @request POST:/api/file/type
   */
  fileAddFileType = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/type`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name FileDelete
   * @request DELETE:/api/file/{id}
   */
  fileDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/${id}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @name FileUploadMultiple
   * @request POST:/api/file/upload
   */
  fileUploadMultiple = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/file/upload`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name WebsiteFindAll
   * @request GET:/api/website
   */
  websiteFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @name WebsiteUpdate
   * @request POST:/api/website
   */
  websiteUpdate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @name WebsiteGetClientList
   * @request GET:/api/website/info
   */
  websiteGetClientList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/website/info`,
      method: 'GET',
      ...params,
    })
}
