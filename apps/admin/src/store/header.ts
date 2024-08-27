import { makeAutoObservable } from 'mobx'

export class HeaderStore {
  menuCollapsed = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setMenuCollapsed() {
    this.menuCollapsed = !this.menuCollapsed
  }
}
