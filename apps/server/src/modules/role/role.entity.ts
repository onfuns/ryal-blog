import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TimeEntity } from '../../common/model/entity.model'
import { Auth } from '../auth/auth.entity'
import { RoleStatusEnum } from './enum'

@Entity()
export class Role extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称', unique: true })
  name: string

  @ApiProperty({ description: '描述' })
  @Column({ comment: '描述', nullable: true })
  description: string

  @ApiProperty({ description: '权限节点 id', type: [Auth] })
  @ManyToMany(() => Auth, { cascade: true })
  @JoinTable({
    name: 'role_auth_relation',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'auth_id' }],
  })
  auths: Auth[]

  @ApiProperty({
    description: '状态',
    default: RoleStatusEnum.Enable,
    enum: RoleStatusEnum,
    enumName: 'RoleStatusEnum',
  })
  @Column({ comment: '状态', default: RoleStatusEnum.Enable })
  status: string
}
