import { HttpStatus, Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResponseResult } from '../common/model/response.model'
const baseTypeNames = ['String', 'Number', 'Boolean']

type ApiResultType<TModel> = {
  type?: TModel | TModel[]
  page?: boolean
  status?: HttpStatus
  description?: string
}

/** 生成返回结果装饰器 */
export const ApiResult = <TModel extends Type<any>>({
  type,
  page,
  status,
  description,
}: ApiResultType<TModel>) => {
  let prop = null

  if (Array.isArray(type)) {
    if (page) {
      prop = {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: getSchemaPath(type[0]) } },
          total: { type: 'number' },
        },
      }
    } else {
      prop = { type: 'array', items: { $ref: getSchemaPath(type[0]) } }
    }
  } else if (type) {
    if (type && baseTypeNames.includes(type.name)) {
      prop = { type: type.name.toLocaleLowerCase() }
    } else {
      prop = { $ref: getSchemaPath(type) }
    }
  } else {
    prop = { type: 'null', default: null }
  }

  const model = Array.isArray(type) ? type[0] : type
  const extralModels = model ? [ResponseResult, model] : [ResponseResult]

  return applyDecorators(
    ApiExtraModels(...extralModels),
    ApiOkResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseResult) },
          {
            properties: { data: prop },
          },
        ],
      },
    }),
  )
}
