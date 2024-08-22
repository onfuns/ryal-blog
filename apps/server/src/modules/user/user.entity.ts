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
import { UserIdentityEnum, UserStatusEnum } from './enum'

@Entity()
export class User extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名', unique: true })
  name: string

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码', select: false })
  password: string

  @ApiProperty({ description: '角色', type: [Role] })
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'user_role_relation',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]

  @ApiProperty({
    description: '状态',
    default: UserStatusEnum.Enable,
    enum: UserStatusEnum,
    enumName: 'UserStatusEnum',
  })
  @Column({ comment: '状态', default: UserStatusEnum.Enable })
  status: string

  @ApiProperty({
    description: '身份',
    default: UserIdentityEnum.Normal,
    enum: UserIdentityEnum,
    enumName: 'UserIdentityEnum',
  })
  @Column({ comment: '身份', default: UserIdentityEnum.Normal })
  identity: string

  @ApiProperty({ description: '上次登录 ip' })
  @Column({ comment: '上次登录 ip', nullable: true })
  last_login_ip: string

  @ApiProperty({ description: '上次登录时间' })
  @CreateDateColumn({ comment: '上次登录时间' })
  last_login_at: string
}
