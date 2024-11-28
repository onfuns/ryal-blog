import { makeObservable } from 'mobx'
import { Base } from './base'

export class WebSiteStore extends Base<{}> {
  websiteInfo = {
    title: 'Ryal Blog',
    description: 'nextjs, node blog, node 博客',
    keywords: 'nextjs, node blog, node 博客',
    git_repository_url: 'https://github.com/onfuns/ryal-blog',
    author: 'ryal',
  }

  constructor() {
    super()
    makeObservable(this, {}, { autoBind: true })
  }
}
