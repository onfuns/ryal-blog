const __DEV__ = process.env.NODE_ENV === 'development'
const BACKEND_URL = 'http://localhost:4000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: __DEV__ ? './.next' : './dist',
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL,
  },
  transpilePackages: [
    '@ryal/api',
    '@ryal/ui-kit',
    'antd',
    '@ant-design/pro-components',
    '@ant-design/pro-layout',
    '@ant-design/pro-utils',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/pro-provider',
    'rc-pagination',
    'rc-picker',
    'rc-util',
  ],
  webpack: (config, context) => {
    if (context.buildId !== 'development') {
      config.cache = false
    }
    config.module.rules.push({
      test: /\.css$/i,
      include: [
        /node_modules\/bytemd/,
        /style/,
        /node_modules\/@fontsource/,
        /node_modules\/@ryal\/ui-kit/,
      ],
      use: ['style-loader', 'css-loader'],
      type: 'asset/inline',
    })
    config.module.rules.push({
      test: /\.less$/i,
      // test: /\.(less|css)$/,
      // exclude: [/node_modules\/bytemd/],
      include: [/node_modules\/@ryal\/ui-kit/, /src/],
      use: ['style-loader', 'css-loader', 'less-loader'],
    })
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
