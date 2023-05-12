import { createContext } from 'react'
import { HeaderStore } from './header'

export { HeaderStore }

export const RootStore = {
  headerStore: new HeaderStore(),
}

export const storesContext = createContext(RootStore)
