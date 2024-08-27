import '@/utils/http-request'
import { Article, Category, Comment, Tag, User } from '@ryal/api'

export * from '@ryal/api'
export const articleService = new Article()
export const userService = new User()
export const categoryService = new Category()
export const commentService = new Comment()
export const tagService = new Tag()
