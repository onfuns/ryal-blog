import { PageListResModel } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from '../article/article.entity'
import { Comment } from '../comment/comment.entity'
import { User } from '../user/user.entity'

class DashboardDataArticleListRes extends PageListResModel {
  @ApiProperty({ description: '文章列表', type: [Article] })
  data: Article[]
}

class DashboardDataCommentListRes extends PageListResModel {
  @ApiProperty({ description: '评论列表', type: [Comment] })
  data: Comment[]
}

export class DashboardDataResDto {
  @ApiProperty({ description: '文章列表', type: DashboardDataArticleListRes })
  readonly article: PageListResModel<Article>

  @ApiProperty({ description: '评论列表', type: DashboardDataCommentListRes })
  readonly comment: PageListResModel<Comment>

  @ApiProperty({ description: '用户信息', type: User })
  readonly user: User
}
