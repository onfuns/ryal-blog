# admin
FROM nginx:1.25.0-alpine AS admin-service
WORKDIR /opt/admin-service

COPY apps/admin/dist ./dist
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf


# client
FROM node:18.16-alpine AS client-service
WORKDIR /opt/client-service
ENV NODE_ENV production

COPY apps/client/dist ./dist
COPY apps/client/next.config.js .
COPY apps/client/public ./public
COPY apps/client/package.json .

RUN yarn --prod
CMD ["yarn","start:prod"]

# server

FROM node:18.16-alpine AS server-service
WORKDIR /opt/server-service
ENV NODE_ENV production

COPY apps/server/dist ./dist
COPY apps/server/package.json  .

RUN yarn --prod
CMD ["yarn", "start:prod"]
