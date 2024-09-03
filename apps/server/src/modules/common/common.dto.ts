import { PageListResultModel } from '@/common/model/page.model'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from '../article/article.entity'
import { Comment } from '../comment/comment.entity'
import { User } from '../user/user.entity'

class DashboardDataArticleListResult extends PageListResultModel {
  @ApiProperty({ description: '文章列表', type: [Article] })
  data: Article[]
}

class DashboardDataCommentListResult extends PageListResultModel {
  @ApiProperty({ description: '评论列表', type: [Comment] })
  data: Comment[]
}

export class DashboardDataResultDto {
  @ApiProperty({ description: '文章列表', type: DashboardDataArticleListResult })
  readonly article: PageListResultModel<Article>

  @ApiProperty({ description: '评论列表', type: DashboardDataCommentListResult })
  readonly comment: PageListResultModel<Comment>

  @ApiProperty({ description: '用户信息', type: User })
  readonly user: User
}
