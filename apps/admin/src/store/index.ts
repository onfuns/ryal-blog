import { createContext } from 'react'
import { HeaderStore } from './header'
import { TabStore } from './tab'

export { HeaderStore, TabStore }

export const RootStore = {
  headerStore: new HeaderStore(),
  tabStore: new TabStore(),
}

export const storesContext = createContext(RootStore)
