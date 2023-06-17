FROM node:20.3.0 as build

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 80
CMD ["npm", "run", "dev"]