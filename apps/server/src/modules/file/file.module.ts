import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileController } from './file.controller'
import { File, FileCategory } from './file.entity'
import { FileService } from './file.service'

@Module({
  imports: [TypeOrmModule.forFeature([File, FileCategory])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
