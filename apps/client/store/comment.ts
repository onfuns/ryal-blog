import { commentService, type CommentCreateReqDtoType, type CommentType } from '@/service'
import { makeAutoObservable } from 'mobx'

export class CommentStore {
  result: { data: CommentType[]; total?: number } = { data: [], total: 0 }

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CommentStore>, value) {
    this[key] = value
  }

  async get(params) {
    const { data } = await commentService.getClientList(params)
    this.set('result', data || [])
  }

  async add(params: CommentCreateReqDtoType) {
    return await commentService.add(params)
  }
}
