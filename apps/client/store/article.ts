import { articleService, type ArticleCreateReqDtoType, type ArticleType } from '@/service'
import { makeAutoObservable } from 'mobx'

export type ArticleListResut = { data: ArticleType[]; total: number }

export class ArticleStore {
  result: ArticleListResut = { data: [], total: 0 }
  info: ArticleType

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<ArticleStore>, value) {
    this[key] = value
  }

  async get(params: ArticleCreateReqDtoType) {
    const { data } = await articleService.getClientList(params)
    this.set('result', data || [])
    return this.result
  }

  async getInfoById(id: string) {
    const { data } = await articleService.info(id)
    this.set('info', data || {})
    return this.info
  }
}
