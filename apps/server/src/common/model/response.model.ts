import { ApiProperty } from '@nestjs/swagger'

export class ResponseResult<TData = any> {
  @ApiProperty({ type: 'boolean', description: '响应成功' })
  success: boolean

  @ApiProperty({ type: 'string', description: '响应描述' })
  message: string

  @ApiProperty({ type: 'string', description: '响应编码' })
  code: string

  @ApiProperty({ type: 'object', description: '响应结果' })
  data?: TData

  constructor(success: boolean, data: TData, message = 'success', code?: string) {
    this.success = success
    this.data = data
    this.message = message
    this.code = code ?? success === false ? '1000' : '0'
  }
}
