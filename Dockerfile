FROM node:latest

WORKDIR /url-shortener
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000
CMD [ "node", "dist/main" ]