import { ArticleService } from '@/modules/article/article.service'
import { CommentService } from '@/modules/comment/comment.service'
import { UserService } from '@/modules/user/user.service'
import { Injectable } from '@nestjs/common'
import { DashboardDataResultDto } from './common.dto'

@Injectable()
export class CommonService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  async findDashboardData(token: string): Promise<DashboardDataResultDto> {
    const defaultPage = { current: 1, pageSize: 10 }
    const article = await this.articleService.getList(defaultPage)
    const comment = await this.commentService.getList(defaultPage)
    const tokenInfo = await this.userService.verifyToken(token)
    let user = undefined
    if (tokenInfo) {
      user = await this.userService.findById(tokenInfo.id)
    }
    return {
      article,
      comment,
      user,
    }
  }
}
