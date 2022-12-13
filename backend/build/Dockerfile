FROM node:16.18.1-alpine3.16

WORKDIR ${BACKEND_WORKDIR}
COPY ./app/package.json ./
RUN npm install
COPY ./app/server.js ./

CMD ["npm", "start"]
