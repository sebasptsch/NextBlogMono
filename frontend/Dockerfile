FROM node:lts-buster-slim as dependencies
RUN apt-get update
RUN apt-get install openssl -y
WORKDIR /app
COPY ./package.json ./yarn.lock ./keystone/package.json ./
RUN yarn install --frozen-lockfile

FROM node:lts-buster-slim as builder
RUN apt-get update
RUN apt-get install openssl -y
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build:frontend

FROM node:lts-buster-slim as production
WORKDIR /app
# RUN apk add libc6-compat
RUN apt-get update
RUN apt-get install openssl -y

COPY --from=builder ./frontend/public ./frontend/public
COPY --from=builder ./frontend/.next ./frontend/.next
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./package.json ./package.json
# COPY --from=builder ./frontend/package.json ./frontend/package.json
COPY --from=builder ./frontend/next.config.js ./frontend/next.config.js

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD yarn start:frontend