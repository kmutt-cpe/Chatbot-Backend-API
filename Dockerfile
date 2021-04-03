# Base Node Version
FROM node:12.18-alpine as nodebase
LABEL project="Chatbot CPE Backend API"
ENV NODE_ENV=prod

###############
# Build Stage #
###############
FROM nodebase AS buildstage
ENV NODE_ENV=prod
WORKDIR /backend-api

COPY package.json yarn.lock ./

# Install all dependencies to build the project
RUN yarn install

COPY . .
RUN yarn run build

#################################
# Dependency Installation Stage #
#################################
FROM nodebase AS prodinstall
ENV NODE_ENV=prod
WORKDIR /backend-api

COPY package.json yarn.lock ./

# Install only production dependency
RUN yarn install --production=true

####################
# Production stage #
####################
FROM nodebase AS prodstage
ENV NODE_ENV=prod
COPY --from=prodinstall ./backend-api/node_modules /backend-api/node_modules
COPY --from=buildstage ./backend-api/dist/ /backend-api/dist
COPY ./package.json /backend-api/

WORKDIR /backend-api

EXPOSE 3000

CMD [ "yarn", "start:prod" ]