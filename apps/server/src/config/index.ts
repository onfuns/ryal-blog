import { __DEV__ } from '@/util'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DevConfig } from './dev'
import { ProdConfig } from './prod'

export type IConfig = {
  /** 接口基础路径 */
  base?: string
  /** 数据库配置 */
  db?: TypeOrmModuleOptions
  /** jwtToken */
  jwtToken?: string
  /** 权限校验 */
  permissionVerification?: boolean
}

const BaseConfig: IConfig = {
  base: '/api',
}

export default {
  ...BaseConfig,
  ...(__DEV__ ? DevConfig : ProdConfig),
}
