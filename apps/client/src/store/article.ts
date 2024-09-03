import { articleService, type ArticleGetListParamsDtoType, type ArticleType } from '@/service'
import { makeObservable } from 'mobx'
import { Base, ResultItemData, type ResultListData } from './base'

export class ArticleStore extends Base<ArticleStore> {
  listData: ResultListData<ArticleType> = { data: [], total: 0 }
  itemData: ResultItemData<ArticleType> = {}

  constructor() {
    super()
    makeObservable(this, {}, { autoBind: true })
  }

  async get(params: ArticleGetListParamsDtoType) {
    const { data } = await articleService.getClientList(params)
    this.setData('listData', data)
    return this.listData
  }

  async getInfoById(id: string) {
    const { data } = await articleService.info(id)
    this.setData('itemData', data || {})
    return this.itemData
  }
}
