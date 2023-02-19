# FROM node:14.16-alpine

# # RUN npm install nodemon -g

# WORKDIR /src

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 8080

# ENTRYPOINT ["npm", "start"]

# CMD ["npm", "start"]


FROM node:14.16-alpine

# RUN npm install nodemon -g

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

FROM redis:6.2-alpine

EXPOSE 6379

# CMD "ls" && "redis-server" && "npm start"
CMD ["npm", "start"]