FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./backend/package*.json ./
RUN npm install
COPY ./backend .

EXPOSE 3000

CMD npm start