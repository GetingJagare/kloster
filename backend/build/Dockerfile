FROM node:16.18.1

WORKDIR ${BACKEND_WORKDIR}
RUN apt-get update && apt-get install -y postfix

COPY ./app/package.json ./
RUN npm install
COPY ./app/.env ./
COPY ./app/server.js ./

CMD ["npm", "start"]
