import { ArticleService } from '@/modules/article/article.service'
import { CommentService } from '@/modules/comment/comment.service'
import { UserService } from '@/modules/user/user.service'
import { Injectable } from '@nestjs/common'
import { Article } from '../article/article.entity'
import { Comment } from '../comment/comment.entity'
import { User } from '../user/user.entity'

@Injectable()
export class CommonService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  async findDashboardData(
    token: string,
  ): Promise<{ article: Article[]; comment: Comment[]; user: User }> {
    const { data: article } = await this.articleService.findAll()
    const { data: comment } = await this.commentService.findAll()
    const tokenInfo = await this.userService.verifyToken(token)
    let user = undefined
    if (tokenInfo) {
      user = await this.userService.findById(tokenInfo.id)
    }
    return {
      article: article?.slice(10),
      comment: comment?.slice(10),
      user,
    }
  }
}
