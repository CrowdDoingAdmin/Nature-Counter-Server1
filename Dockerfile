FROM node:14.16-alpine

RUN npm install nodemon -g
WORKDIR /src
RUN npm install
COPY . .
CMD ["npm", "start"]