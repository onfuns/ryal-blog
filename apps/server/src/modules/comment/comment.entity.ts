import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Article } from '../article/article.entity'
import { CommentStatusEnum } from './enum'

@Entity()
export class Comment extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '昵称' })
  @Column({ comment: '昵称' })
  name: string

  @ApiProperty({ description: '内容' })
  @Column({ comment: '内容', type: 'text' })
  content: string

  @ApiProperty({ description: '回复内容' })
  @Column({ comment: '回复内容', nullable: true, type: 'text' })
  reply: string

  @ApiProperty({ description: '网址' })
  @Column({ comment: '网址', nullable: true })
  url: string

  @ApiProperty({ description: '关联文章 id' })
  @Column({ comment: '关联文章 id', length: 36 })
  aid: string

  @ApiProperty({ description: '关联文章' })
  @ManyToOne(() => Article, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'aid' })
  article: Article

  @ApiProperty({
    description: '状态',
    default: CommentStatusEnum.Unaudited,
    enum: CommentStatusEnum,
    enumName: 'CommentStatusEnum',
  })
  @Column({ comment: '状态', default: CommentStatusEnum.Unaudited })
  status: string
}
