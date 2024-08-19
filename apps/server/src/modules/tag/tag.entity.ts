import { TimeEntity } from '@/common/model/entity.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tag extends TimeEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称' })
  name: string

  @ApiProperty({ description: '描述' })
  @Column({ comment: '描述', nullable: true })
  description: string
}
