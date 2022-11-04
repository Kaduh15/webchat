FROM node:16-alpine

WORKDIR /usr/app-front

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
