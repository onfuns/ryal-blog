import { isServer } from '@/utils'
import { enableStaticRendering } from 'mobx-react'
import { createContext } from 'react'
import { ArticleStore } from './article'
import { CategoryStore } from './category'
import { CommentStore } from './comment'
import { WebSiteStore } from './website'
enableStaticRendering(isServer)

export { ArticleStore, CategoryStore, CommentStore, WebSiteStore }

export const RootStore = {
  articleStore: new ArticleStore(),
  categoryStore: new CategoryStore(),
  commentStore: new CommentStore(),
  webSiteStore: new WebSiteStore(),
}

export const storesContext = createContext(RootStore)
