import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CategoryStatusEnum, CategoryTypeEnum } from './enum'

@Entity()
export class Category extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称' })
  name: string

  @ApiProperty({ description: '路由别名' })
  @Column({ comment: '路由别名', nullable: true })
  ename: string

  @ApiProperty({ description: '父级ID', default: 0 })
  @Column({ comment: '父级ID', default: 0 })
  pid: number

  @ApiProperty({
    description: '类型',
    default: CategoryTypeEnum.List,
    enum: CategoryTypeEnum,
    enumName: 'CategoryTypeEnum',
  })
  @Column({ comment: '类型', default: CategoryTypeEnum.List })
  type: string

  @ApiProperty({
    description: '显示状态',
    default: CategoryStatusEnum.Enable,
    enum: CategoryStatusEnum,
    enumName: 'CategoryStatusEnum',
  })
  @Column({ comment: '显示状态', default: CategoryStatusEnum.Enable })
  status: string

  @ApiProperty({ description: '权重', default: 0 })
  @Column({ comment: '权重', default: 0 })
  sort: number

  @ApiProperty({ description: '链接地址' })
  @Column({ comment: '链接地址', nullable: true })
  url: string

  @ApiProperty({ description: '图标' })
  @Column({ comment: '图标', nullable: true })
  icon: string

  @ApiProperty({ description: '图标颜色' })
  @Column({ comment: '图标颜色', nullable: true })
  icon_color: string
}
