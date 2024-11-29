import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
const __DEV__ = process.env.NODE_ENV === 'development'
const BACKEND_URL = 'http://localhost:4000'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: __DEV__ ? './.next' : './dist',
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL,
  },
  experimental: {
    optimizePackageImports: ['@ryal/ui-kit'],
  },
  transpilePackages: [
    '@ryal/api',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-util',
    'rc-tree',
    'rc-table',
    'rc-input',
  ],
  webpack: (config, context) => {
    if (context.buildId !== 'development') {
      config.cache = false
    }

    //https://github.com/vercel/next.js/issues/34501#issuecomment-1046655345
    if (config.module.generator?.asset?.filename) {
      if (!config.module.generator['asset/resource']) {
        config.module.generator['asset/resource'] = config.module.generator.asset
      }
      delete config.module.generator.asset
    }

    config.module.rules.push({
      test: /\.(less|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              paths: [path.resolve(__dirname, 'node_modules')],
            },
          },
        },
      ],
    })

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
      }),
    )

    return config
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/article',
    },
    {
      source: '/category/:ename',
      destination: '/article',
    },
    {
      source: '/article/:id',
      destination: '/article/info/:id',
    },
    {
      source: '/api/:path*',
      destination: `${BACKEND_URL}/api/:path*`,
    },
  ],
}

export default nextConfig
