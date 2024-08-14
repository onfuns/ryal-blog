import path from 'path'
import { generateApi } from 'swagger-typescript-api'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

generateApi({
  output: path.join(__dirname, './src/api'),
  url: 'http://localhost:4000/swagger/api-docs.json',
  httpClientType: 'axios',
  modular: true,
  typeSuffix: 'Types',
  moduleNameFirstTag: true,
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      return templateRouteName.replace('Controller', '')
    },
  },
})
