
FROM node:22.9.0-alpine

RUN npm install -g codemirror @vue/cli vue-router@4 vuetify
RUN mkdir /home/vue-projects
RUN mkdir /home/vue-projects/vpl-data-science
RUN apk add --no-cache bash

WORKDIR /home/vue-projects/vpl-data-science/
COPY ./vpl-data-science/ /home/vue-projects/vpl-data-science/

RUN npm install vite@latest -D
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]

# docker build -t node-develop .
# docker run -v ./node/:/home/vue-projects/ -it node-develop bash