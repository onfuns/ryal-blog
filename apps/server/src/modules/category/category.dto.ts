import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CreateParams } from '../../common/model/page.model'
import { Category } from './category.entity'

export class CategoryCreateParams extends CreateParams(Category) {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '分类路由' })
  @IsNotEmpty({ message: '路由不能为空' })
  readonly ename: string
}

export class CategoryListItem extends Category {
  @ApiProperty({ description: '子类' })
  readonly children: Category[]
}

export class CategoryGetListParams extends PartialType(PickType(Category, ['type'])) {}
