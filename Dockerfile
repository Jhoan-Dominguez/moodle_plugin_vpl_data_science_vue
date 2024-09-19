
FROM node:22.9.0-alpine

RUN npm install -g codemirror @vue/cli vue-router@4 vuetify
RUN mkdir /home/vue-projects
RUN apk add --no-cache bash

WORKDIR /home/vue-projects
COPY ./vue-plugin/ /home/vue-projects/

RUN npm install

CMD ["npm", "run", "dev"]

# docker build -t node-develop .
# docker run -v ./node/:/home/vue-projects/ -it node-develop bash