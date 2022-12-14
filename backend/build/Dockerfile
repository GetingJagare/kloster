FROM node:16.18.1

WORKDIR /opt/kloster_backend
RUN mkdir mail

COPY ./app/package.json ./
RUN npm install
COPY ./app/.env ./
COPY ./app/server.js ./

CMD ["npm", "start"]
