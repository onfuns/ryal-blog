import { Category } from '@/modules/category/category.entity'
import { Tag } from '@/modules/tag/tag.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Article {
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
  @Column({ nullable: true, comment: '描述' })
  description: string

  @ApiProperty({ description: '排序' })
  @Column({ default: 0, comment: '排序', type: 'bigint' })
  sort: string

  @ApiProperty({ description: '内容' })
  @Column({ type: 'text', nullable: true, comment: '内容' })
  content: string

  @ApiProperty({ description: '是否审核通过 0-否 1-是' })
  @Column({ default: 1, comment: '是否审核通过' })
  pass_flag: number

  @ApiProperty({ description: '是否评论 0-否 1-是' })
  @Column({ default: 0, comment: '是否评论 0-否 1-是' })
  comment_flag: number

  @ApiProperty({ description: '发布时间' })
  @Column({ comment: '发布时间' })
  publish_time: string

  @ApiProperty({ description: '作者' })
  @Column({ comment: '作者', nullable: true })
  author: string

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  created_at: string

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updated_at: string
}
