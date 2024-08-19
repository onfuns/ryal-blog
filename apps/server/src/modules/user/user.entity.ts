import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from '../role/role.entity'

@Entity()
export class User extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称', unique: true })
  name: string

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码', select: false })
  password: string

  @ApiProperty({ description: '角色' })
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'user_role_relation',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]

  @ApiProperty({ description: '状态 0-停用 1-启用', default: 1 })
  @Column({ comment: '状态 0-停用 1-启用', default: 1 })
  enable: number

  @ApiProperty({ description: '是否超级管理员', default: 0 })
  @Column({ comment: '是否超级管理员', default: 0 })
  super: number

  @ApiProperty({ description: '上次登录 ip' })
  @Column({ comment: '上次登录 ip', nullable: true })
  last_login_ip: string

  @ApiProperty({ description: '上次登录时间' })
  @CreateDateColumn({ comment: '上次登录时间' })
  last_login_at: string
}
