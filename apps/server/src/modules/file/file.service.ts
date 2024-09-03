import { PageListResultModel } from '@/common/model/page.model'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pickBy } from 'lodash'
import { join } from 'path'
import { Like, Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { FileCreateParamsDto, FileGetListParamsDto } from './file.dto'
import { File, FileCategory } from './file.entity'

@Injectable()
export class FileService {
  @InjectRepository(File)
  private readonly fileRepository: Repository<File>
  @InjectRepository(FileCategory)
  private readonly fileCategoryRepository: Repository<FileCategory>

  async getList(query: FileGetListParamsDto): Promise<PageListResultModel<File>> {
    const { current = 1, pageSize = 20, fileCategoryId, originalname } = query ?? {}

    const where: Partial<File> = pickBy({
      originalname: originalname ? Like(`%${originalname}%`) : undefined,
      file_category_id: fileCategoryId ?? undefined,
    })
    const [data, total = 0] = await this.fileRepository.findAndCount({
      where: where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: { created_at: 'DESC' },
      relations: ['filecategory'],
    })
    return { data, total }
  }

  async delete(id: number): Promise<null> {
    await this.fileRepository.delete(id)
    return null
  }

  async getFileCategoryList(): Promise<FileCategory[]> {
    return this.fileCategoryRepository.find()
  }

  async addFileCategory(name: FileCategory['name']): Promise<FileCategory> {
    return this.fileCategoryRepository.save({ name })
  }

  async upload(
    files: FileCreateParamsDto[],
    fileCategoryId?: FileCategory['id'],
  ): Promise<boolean> {
    const date = dayjs().format('YYYYMMDD')
    const filePath = join('uploads', date)
    const dir = join(__dirname, '../../../', filePath)

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    for (const file of files) {
      const fileExt = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
      const name = `${uuidv4()}.${fileExt}`
      const fileUrl = `${dir}/${name}`
      createWriteStream(fileUrl).write(file.buffer)
      await this.fileRepository.save({
        ext: fileExt,
        file_category_id: fileCategoryId || undefined,
        url: join(filePath, name),
        size: file.size,
        originalname: file.originalname,
      })
    }
    return true
  }
}
