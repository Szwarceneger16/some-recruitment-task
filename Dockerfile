# syntax=docker/dockerfile:1
FROM node:lts
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN yarn install && yarn global add serve && yarn build

CMD ["node", "serve -s docs"]

