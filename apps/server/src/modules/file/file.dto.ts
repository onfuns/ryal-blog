import { MixinCreateDto, MixinPageListDto } from '@/common/model/page.model'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { File, FileCategory } from './file.entity'

export class FileCreateReqDto extends MixinCreateDto(File) {
  @ApiProperty({ description: '原名称' })
  @IsNotEmpty({ message: '原名称不能为空' })
  readonly originalname: string

  @ApiProperty({ description: '文件类型' })
  @IsNotEmpty({ message: '文件类型不能为空' })
  readonly mimetype: string

  @ApiProperty({ description: '文件 buffer' })
  @IsNotEmpty({ message: '文件 buffer 不能为空' })
  readonly buffer: Buffer
}

export class FileListReqDto extends MixinPageListDto(File) {
  @ApiPropertyOptional({ description: '分类 id' })
  fileCategoryId?: number
}

export class FileCategoryCreateReqDto extends MixinCreateDto(FileCategory) {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string
}
