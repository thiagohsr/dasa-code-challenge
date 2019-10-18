
#https://br.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

FROM node:lts-alpine as dockerized

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]