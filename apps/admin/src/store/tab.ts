import { makeAutoObservable } from 'mobx'
import { type IRouter } from '../routes'

export type TabType = Pick<IRouter, 'name' | 'path' | 'component' | 'meta'> & {
  /** 路由 state */
  state?: Record<string, any> | undefined
  /** 路由 search */
  search?: string
}

type TabPath = TabType['path']

export class TabStore {
  tabs: TabType[] = []
  selectedTabPath: TabPath = ''

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onUpdateTab(tab: TabType) {
    if (tab.meta?.tag === false) return false
    const index = this.tabs?.findIndex(t => t.path === tab.path)
    if (index > -1) {
      this.tabs[index] = { ...this.tabs[index], ...tab }
    } else {
      this.tabs.push(tab)
    }
  }

  onRemoveTab(path: TabPath) {
    this.tabs = [...this.tabs.filter(item => item.path !== path)]
  }

  onSelectedTabPath(path: TabPath) {
    this.selectedTabPath = path
  }
}
