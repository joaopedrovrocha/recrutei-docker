FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm cache verify
RUN npm install -g create-react-app
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
