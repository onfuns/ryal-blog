import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class TimeEntity {
  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  created_at: string

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updated_at: string
}
