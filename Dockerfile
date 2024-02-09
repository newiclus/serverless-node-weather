FROM node:18-alpine as base

WORKDIR /src
COPY package*.json /

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]
