# Base Node Version
FROM node:12.18-alpine as nodebase
LABEL project="Chatbot CPE Backend API"

FROM nodebase as production
WORKDIR /backend-api
COPY package.json yarn.lock /backend-api/
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:prod"]