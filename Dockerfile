FROM node:17-alpine

WORKDIR /app
ADD package.json .
ADD . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]