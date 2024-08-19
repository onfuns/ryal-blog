import { mixinClass } from '@/utils'
import { Article, Auth, Category, Comment, Common, File, Role, Tag, User, Website } from '@ryal/api'
import { UserLocalService } from './user'

export * from '@ryal/api'
export const articleService = new Article()
export const userService = mixinClass(UserLocalService, User)
export const roleService = new Role()
export const fileService = new File()
export const categoryService = new Category()
export const commentService = new Comment()
export const commonService = new Common()
export const tagService = new Tag()
export const websiteService = new Website()
export const authService = new Auth()
