FROM node:14-alpine AS base
LABEL maintainer="UpcraftLP <https://github.com/UpcraftLP>"

WORKDIR /app

# copy project files
COPY package*.json ./
COPY next-env.d.ts ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY .env ./

ENV NODE_ENV=production

# -------------------------------------------------------------------------------------
FROM base AS dependencies

# install dependency packages
RUN npm config set depth 0
RUN npm ci --only=production --no-progress

RUN mkdir /dep && cp -R node_modules /dep/node_modules_production


# -------------------------------------------------------------------------------------
FROM dependencies AS test
#TODO test stage


# -------------------------------------------------------------------------------------
FROM base AS build

#copy production node_modules
COPY --from=dependencies /dep/node_modules_production ./node_modules

# copy over app sources
COPY . .

# build the site and prepare production build
RUN npm run build


# -------------------------------------------------------------------------------------
FROM build AS deploy

EXPOSE 3000
CMD npm start
