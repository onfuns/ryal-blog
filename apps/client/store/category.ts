import { categoryService, type CategoryListItemDtoType } from '@/service'
import { makeAutoObservable } from 'mobx'

export class CategoryStore {
  result: CategoryListItemDtoType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CategoryStore>, value) {
    this[key] = value
  }

  async get() {
    const { data } = await categoryService.getClientList()
    this.set('result', data || [])
  }
}
