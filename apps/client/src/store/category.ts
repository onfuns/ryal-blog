import { categoryService, type CategoryListItemType } from '@/service'
import { makeObservable } from 'mobx'
import { Base, type ResultListData } from './base'

export class CategoryStore extends Base<CategoryStore> {
  listData: ResultListData<CategoryListItemType>['data'] = []

  constructor() {
    super()
    makeObservable(this, {}, { autoBind: true })
  }

  async get() {
    const { data } = await categoryService.getClientList()
    this.setData('listData', data)
  }
}
