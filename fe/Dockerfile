FROM node:16.18.1-alpine3.15 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/fe

COPY package.json ./
COPY yarn.lock ./

RUN yarn global add expo-cli
RUN yarn install

COPY . .

CMD ["sh","-c","expo start --web"]