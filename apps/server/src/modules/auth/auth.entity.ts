import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AuthNodeTypeEnum } from './enum'

@Entity()
export class Auth extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称' })
  name: string

  @ApiProperty({ description: '编码' })
  @Column({ comment: '编码', unique: true })
  code: string

  @ApiProperty({
    description: '节点类型',
    default: AuthNodeTypeEnum.Menu,
    enum: AuthNodeTypeEnum,
    enumName: 'AuthNodeTypeEnum',
  })
  @Column({ comment: '节点类型', default: AuthNodeTypeEnum.Menu })
  node_type: string

  @ApiProperty({ description: '父级节点 id', default: 0 })
  @Column({ comment: '父级节点 id', default: 0 })
  pid: number
}
