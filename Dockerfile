FROM node:latest

WORKDIR /url-shortener
 
COPY package*.json ./
 
RUN npm install

COPY . .
 
EXPOSE 8080
CMD [ "node", "dist/main" ]