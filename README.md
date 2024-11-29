基于 NestJS + Mysql + Next.js 开发的博客系统，支持文章、分类、标签、评论、角色权限等功能，适合搭建博客或学习使用。

## 技术栈

- **Server**： `NestJS` + `TypeORM` + `Mysql` + `TypeScript`
- **Client**： `Next.js` + `Antd` + `Mobx` + `TypeScript`
- **Admin** ： `Vite` + `Antd` + `Mobx` + `TypeScript`

> V2 版本使用 Swagger 自动生成 API 接口及类型，避免手动定义接口冗余。

## 预览

> 使用 vercel 托管，需要梯子访问。

- 前台：[https://demo.onfuns.com](https://demo.onfuns.com)
- 后台：[https://demo.onfuns.com/admin/login](https://demo.onfuns.com/admin/login) (demo/a123456)

## 开发

```bash

# 初始化安装包
yarn bootstrap

# 启动服务端
yarn dev:server
# 启动管理端
yarn dev:admin
# 启动客户端
yarn dev:client

```

如果服务端新增接口，需要启动服务端后，根目录执行命令在对应包`@ryal/api`生成接口及接口类型，会自动同步到管理端和客户端。

```bash
yarn build:api
```

同理，基础组件库`@ryal/ui-kit`如果改动也需要同步到管理端和客户端：

```bash
yarn build:ui-kit
```

## 构建

可全部构建也可单包构建。

```bash
# 全部构建
yarn build

# 单包构建-服务端
yarn build:server
# 单包构建-管理端
yarn build:admin
# 单包构建-客户端
yarn build:client

```

## 部署

新建数据库`ryal_blog`，本地可以导入 `server` 中的演示数据 `init.sql`，生产环境可以使用 `Navicat`数据迁移。

新建配置文件：

```bash
cd /etc && touch .blog.server.production

```

写入以下数据库配置：

```bash
DB_HOST = localhost       # 主机
DB_PORT = 3306            # 端口
DB_USER = root            # 用户名
DB_PASS = 123456          # 密码
DB_DATABASE =  xxxxxxxx   # 数据库名称
JWT_TOKEN = xxxxx         # JWT 登录鉴权 KEY
```

启动方式：

- 单进程模式：`yarn start:prod`
- pm2 启动： `yarn start:pm2`

#### Nginx 代理

生产环境建议使用 `nginx` 代理，参考 `nginx.conf` 设置。

#### Github Action 模式

参考根目录 `.github/workflows` 中配置，注意 `secrets.ACCESS_TOKEN` 为目标机器中的私钥，且目标机器支持密钥登录。

目标机器 `ssh` 配置如下：

```bash
# 制作密钥，一直回车，默认生成在 ~/.ssh 目录
ssh-keygen
# 生产鉴权 key
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
chmod 600 authorized_keys
```

编辑 `/etc/ssh/sshd_config` 文件，如无则新增：

```bash

RSAAuthentication yes
PubkeyAuthentication yes
PermitRootLogin yes
```

重启 `ssh` 服务：

```bash
service sshd restart
```

注意：`Action` 模式依赖 `pm2` 启动，需要在部署机器上全局安装

```bash
sudo yarn global add pm2
```

#### 手动模式

打包：

```bash
# admin
cd apps/admin
tar -zcvf admin.tar.gz dist
# clinet
cd apps/client
tar -zcvf client.tar.gz dist public next.config.js package.json pm2.json
# server
cd apps/server
tar -zcvf server.tar.gz dist package.json pm2.json
```

解压参考：

```bash
mkdir -p ./server
tar -xzvf server.tar.gz -C ./server
```

## 功能

#### 后台功能

- [x] 文章管理
- [x] 分类管理
- [x] 标签管理
- [x] 评论管理
- [x] 登录鉴权
- [x] 权限管理
- [x] 用户管理
- [x] 首页面板
- [x] 权限校验

#### 前台功能

- [x] 分类
- [x] 文章
- [x] 评论
