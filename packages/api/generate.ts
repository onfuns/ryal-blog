import fs from 'node:fs/promises'
import path from 'path'
import { generateApi } from 'swagger-typescript-api'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const lowerCase = (name: string) => name.charAt(0).toLocaleLowerCase()

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
      return lowerCase(name) + name.slice(1)
    },
  },
}).then(({ files }) => {
  const defaultExoprts = [`export * from './src/http-client.ts'\n`]
  let content = defaultExoprts.join('')
  files
    .sort((a, b) => lowerCase(a.fileName).localeCompare(lowerCase(b.fileName)))
    .forEach(file => {
      content += `export * from './src/${file.fileName}${file.fileExtension}'\n`
      fs.writeFile(path.join(__dirname, './index.ts'), content, 'utf-8')
    })
})
