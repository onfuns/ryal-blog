import { commentService, type CommentCreateReqDtoType, type CommentType } from '@/service'
import { type NonFunctionProperties } from '@/type'
import { makeAutoObservable } from 'mobx'

export class CommentStore {
  result: { data: CommentType[]; total?: number } = { data: [], total: 0 }

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CommentStore>, value: any) {
    this[key] = value
  }

  async get() {
    const { data } = await commentService.getClientList()
    this.set('result', data || [])
  }

  async add(params: CommentCreateReqDtoType) {
    return await commentService.add(params)
  }
}
