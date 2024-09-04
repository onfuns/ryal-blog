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
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger'
import {
  FileCategoryCreateParamsDto,
  FileCreateParamsDto,
  FileGetListParamsDto,
  FileUploadParamsDto,
} from './file.dto'
import { File, FileCategory } from './file.entity'
import { FileService } from './file.service'

@ApiTags('file')
@Controller('/file')
export class FileController {
  constructor(@Inject(FileService) private readonly service: FileService) {}

  @ApiResult({ description: '获取文件列表', type: [File], page: true })
  @Get()
  async getList(@Query() query: FileGetListParamsDto) {
    return this.service.getList(query)
  }

  @ApiResult({ description: '删除文件' })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') id: File['id']) {
    return this.service.delete(id)
  }

  @ApiResult({ description: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({
    description: '上传文件参数',
    type: FileUploadParamsDto,
  })
  upload(@UploadedFiles() files: FileCreateParamsDto[], @Body() body: FileUploadParamsDto) {
    const { fileCategoryId } = body
    if (files.length > 5) {
      return new ResponseResult(false, null, '一次最多上传5张图片')
    } else if (files.some(file => !file.mimetype?.includes('image/'))) {
      return new ResponseResult(false, null, '只能上传图片')
    }
    return this.service.upload(files, fileCategoryId)
  }

  @ApiResult({ description: '获取文件分类列表', type: [FileCategory] })
  @Get('category')
  async getFileCategoryList() {
    return this.service.getFileCategoryList()
  }

  @ApiResult({ description: '新增文件分类', type: FileCategory })
  @Post('category')
  async addFileCategory(@Body() body: FileCategoryCreateParamsDto) {
    return this.service.addFileCategory(body.name)
  }
}
