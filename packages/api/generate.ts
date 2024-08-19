import fs from 'node:fs/promises'
import path from 'path'
import { generateApi } from 'swagger-typescript-api'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

generateApi({
  output: path.join(__dirname, './src'),
  url: 'http://localhost:4000/swagger/api-docs.json',
  httpClientType: 'axios',
  modular: true,
  typeSuffix: 'Type',
  moduleNameFirstTag: true,
  unwrapResponseData: true,
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      const name = templateRouteName.split('Controller')?.[1] || templateRouteName
      return name.charAt(0).toLocaleLowerCase() + name.slice(1)
    },
  },
}).then(({ files }) => {
  let content = ''
  files
    .sort((a, b) => a.fileName.localeCompare(b.fileName))
    .forEach(file => {
      content += `export * from './src/${file.fileName}${file.fileExtension}'\n`
      fs.writeFile(path.join(__dirname, './index.ts'), content, 'utf-8')
    })
})
