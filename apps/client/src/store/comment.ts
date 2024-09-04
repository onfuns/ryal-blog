import { commentService, type CommentCreateParamsType, type CommentType } from '@/service'
import { makeObservable } from 'mobx'
import { Base, type ResultListData } from './base'

export class CommentStore extends Base<CommentStore> {
  listData: ResultListData<CommentType> = { data: [], total: 0 }

  constructor() {
    super()
    makeObservable(this, {}, { autoBind: true })
  }

  async get(params: Parameters<typeof commentService.getClientList>[0]) {
    const { data } = await commentService.getClientList(params)
    this.setData('listData', data)
  }

  async add(params: CommentCreateParamsType) {
    return await commentService.add(params)
  }
}
