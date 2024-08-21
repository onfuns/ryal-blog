import DevConfig from './dev'
import ProdConfig from './prod'

export interface IConfig {
  routeBasename?: string
}

const BaseConfig: IConfig = {
  routeBasename: '/admin',
}

const Config: IConfig = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig
export default { ...BaseConfig, ...Config }
