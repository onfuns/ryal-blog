import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TimeEntity } from '../../common/model/entity.model'

@Entity()
export class FileCategory extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称', unique: true })
  name: string
}

@Entity()
export class File extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '分类', type: FileCategory })
  @ManyToOne(() => FileCategory, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'file_category_id' })
  fileCategory: FileCategory

  @ApiProperty({ description: '分类 id' })
  @Column({ comment: '分类 id', nullable: true })
  file_category_id: number

  @ApiProperty({ description: '原名称' })
  @Column({ comment: '原名称', nullable: true })
  originalname: string

  @ApiProperty({ description: '地址' })
  @Column({ comment: '地址' })
  url: string

  @ApiProperty({ description: '大小' })
  @Column({ comment: '大小' })
  size: number

  @ApiProperty({ description: '后缀' })
  @Column({ comment: '后缀' })
  ext: string
}
