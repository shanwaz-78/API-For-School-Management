FROM node:18-alpine as nodejs
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", 'start' ]
