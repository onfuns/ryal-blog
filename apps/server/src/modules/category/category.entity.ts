import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称' })
  name: string

  @ApiProperty({ description: '路由' })
  @Column({ comment: '路由', unique: true })
  ename: string

  @ApiProperty({ description: '父级ID', default: 0 })
  @Column({ comment: '父级ID', default: 0 })
  pid: number

  @ApiProperty({ description: '类型', default: 1 })
  @Column({ comment: '类型', default: 1 })
  type: number

  @ApiProperty({ description: '状态 1-显示 0-隐藏' })
  @Column({ comment: '状态 1-显示 0-隐藏', default: 1 })
  status: number

  @ApiProperty({ description: '排序', default: 0 })
  @Column({ comment: '排序', default: 0 })
  sort: number

  @ApiProperty({ description: '外链地址' })
  @Column({ comment: '外链地址', nullable: true })
  url: string

  @ApiProperty({ description: '图标' })
  @Column({ comment: '图标', nullable: true })
  icon: string

  @ApiProperty({ description: '图标颜色' })
  @Column({ comment: '图标颜色', nullable: true })
  icon_color: string
}
