FROM node:lts-buster-slim as dependencies
RUN apt-get update
RUN apt-get install openssl -y -qq
WORKDIR /app
COPY ./package.json  ./
COPY ./yarn.lock  ./
COPY  ./frontend/package.json ./frontend/package.json
RUN yarn install --frozen-lockfile --production

FROM node:lts-buster-slim as builder
RUN apt-get update
RUN apt-get install openssl -y -qq
ARG GRAPHQL_ENDPOINT
ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build:frontend

FROM node:lts-buster-slim as production
WORKDIR /app
# RUN apk add libc6-compat
RUN apt-get update
RUN apt-get install openssl -y -qq
ARG GRAPHQL_ENDPOINT
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/frontend/package.json ./frontend/package.json
COPY --from=builder /app/frontend/next.config.js ./frontend/next.config.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD yarn start:frontend