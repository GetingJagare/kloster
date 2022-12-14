FROM node:16.18.1

WORKDIR /opt/kloster_backend
#RUN apt-get update
#RUN apt-get install -y --no-install-recommends sendmail
#RUN rm -rf /var/lib/apt/lists/*

COPY ./app/package.json ./
RUN npm install
COPY ./app/.env ./
COPY ./app/server.js ./

CMD ["npm", "start"]
