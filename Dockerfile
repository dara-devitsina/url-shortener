FROM node:latest

WORKDIR /home/node/app
 
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm run build

COPY . .
 
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]