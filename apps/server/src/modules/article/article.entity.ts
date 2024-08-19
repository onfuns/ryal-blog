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

@Entity()
export class Article extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryColumn({ generated: 'uuid', length: 36 })
  id: string

  @ApiProperty({ description: '分类' })
  @ManyToOne(() => Category, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ApiProperty({ description: '分类ID' })
  @Column({ comment: '分类ID' })
  category_id: number

  @ApiProperty({ description: '标签' })
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

  @ApiProperty({ description: '是否审核通过 0-否 1-是', default: 1 })
  @Column({ comment: '是否审核通过', default: 1 })
  pass_flag: number

  @ApiProperty({ description: '是否评论 0-否 1-是', default: 0 })
  @Column({ comment: '是否评论 0-否 1-是', default: 0 })
  comment_flag: number

  @ApiProperty({ description: '发布时间' })
  @Column({ comment: '发布时间' })
  publish_time: string

  @ApiProperty({ description: '作者' })
  @Column({ comment: '作者', nullable: true })
  author: string
}
