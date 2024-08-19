import { ResponseResult } from '@/common/model/response.model'
import { ApiResult } from '@/decorator/api-result.decorator'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { FileCategoryCreateReqDto, FileCreateReqDto, FileListReqDto } from './file.dto'
import { File, FileCategory } from './file.entity'
import { FileService } from './file.service'

@ApiTags('file')
@Controller('/file')
export class FileController {
  constructor(@Inject(FileService) private readonly service: FileService) {}

  @ApiResult({ description: '获取文件列表', type: File })
  @Get()
  async getList(@Query() query: FileListReqDto) {
    return this.service.findAll(query)
  }

  @ApiResult({ description: '删除文件' })
  @Delete(':id')
  async delete(@Param('id') id: File['id']) {
    return this.service.delete(id)
  }

  @ApiResult({ description: '上传文件' })
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(
    @UploadedFiles() files: FileCreateReqDto[],
    @Body('fileCategoryId') fileCategoryId?: FileCategory['id'],
  ) {
    if (files.length > 5) {
      return new ResponseResult(false, null, '一次最多上传5张图片')
    } else if (files.some(file => !file.mimetype?.includes('image/'))) {
      return new ResponseResult(false, null, '只能上传图片')
    }
    return this.service.upload(files, fileCategoryId)
  }

  @ApiResult({ description: '获取文件分类列表', type: FileCategory })
  @Get('category')
  async findFileCategory() {
    return this.service.findFileCategory()
  }

  @ApiResult({ description: '新增文件分类', type: FileCategory })
  @Post('category')
  async addFileCategory(@Body('name') name: FileCategoryCreateReqDto['name']) {
    return this.service.addFileCategory(name)
  }
}
