import {
  commentService,
  type CommentCreateParamsDtoType,
  type CommentGetListParamsDtoType,
  type CommentType,
} from '@/service'
import { makeObservable } from 'mobx'
import { Base, type ResultListData } from './base'

export class CommentStore extends Base<CommentStore> {
  listData: ResultListData<CommentType> = { data: [], total: 0 }

  constructor() {
    super()
    makeObservable(this, {}, { autoBind: true })
  }

  async get(params: CommentGetListParamsDtoType) {
    const { data } = await commentService.getClientList(params)
    this.setData('listData', data)
  }

  async add(params: CommentCreateParamsDtoType) {
    return await commentService.add(params)
  }
}
