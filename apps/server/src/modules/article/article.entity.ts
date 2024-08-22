import { TimeEntity } from '@/common/model/entity.model'
import { Category } from '@/modules/category/category.entity'
import { Tag } from '@/modules/tag/tag.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { ArticleCommentStatusEnum, ArticleEditorTypeEnum, ArticlePassStatusEnum } from './enum'

@Entity()
export class Article extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryColumn({ generated: 'uuid', length: 36 })
  id: string

  @ApiProperty({ description: '分类', type: Category })
  @ManyToOne(() => Category, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ApiProperty({ description: '分类ID' })
  @Column({ comment: '分类ID' })
  category_id: number

  @ApiProperty({ description: '标签', type: [Tag] })
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'article_tag_relation',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[]

  @ApiProperty({ description: '标题' })
  @Column({ comment: '标题' })
  title: string

  @ApiProperty({ description: '描述' })
  @Column({ comment: '描述', nullable: true })
  description: string

  @ApiProperty({ description: '排序' })
  @Column({ comment: '排序', default: 0 })
  sort: number

  @ApiProperty({ description: '内容' })
  @Column({ comment: '内容', type: 'text', nullable: true })
  content: string

  @ApiProperty({
    description: '是否审核通过',
    default: ArticlePassStatusEnum.Unaudited,
    enum: ArticlePassStatusEnum,
    enumName: 'ArticlePassStatusEnum',
  })
  @Column({ comment: '是否审核通过', default: ArticlePassStatusEnum.Audited })
  pass_status: string

  @ApiProperty({
    description: '是否开放评论',
    default: ArticleCommentStatusEnum.Closed,
    enum: ArticleCommentStatusEnum,
    enumName: 'ArticleCommentStatusEnum',
  })
  @Column({ comment: '是否开放评论', default: ArticleCommentStatusEnum.Closed })
  comment_status: string

  @ApiProperty({
    description: '编辑器类型',
    default: ArticleEditorTypeEnum.Markdown,
    enum: ArticleEditorTypeEnum,
    enumName: 'ArticleEditorTypeEnum',
  })
  @Column({ comment: '是否开放评论', default: ArticleEditorTypeEnum.Markdown })
  editor_type: string

  @ApiProperty({ description: '发布时间' })
  @Column({ comment: '发布时间', type: 'time' })
  publish_time: Date

  @ApiProperty({ description: '作者' })
  @Column({ comment: '作者', nullable: true })
  author: string
}
