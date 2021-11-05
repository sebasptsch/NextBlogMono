FROM node:lts-buster-slim as dependencies
RUN apt-get update
RUN apt-get install openssl -y -qq
WORKDIR /app
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
RUN ls
COPY ./package.json  ./
COPY ./yarn.lock  ./
COPY  ./keystone/package.json ./keystone/package.json
RUN yarn install --frozen-lockfile --production


FROM node:lts-buster-slim as builder
RUN apt-get update
RUN apt-get install openssl -y -qq
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build:keystone


FROM node:lts-buster-slim as production
WORKDIR /app
# RUN apk add libc6-compat
RUN apt-get update
RUN apt-get install openssl -y -qq
COPY . .
COPY  --from=builder /app/keystone/.keystone ./keystone/.keystone
COPY  --from=builder /app/node_modules ./node_modules
COPY  --from=builder /app/keystone/migrations ./keystone/migrations
COPY --from=builder  /app/keystone/package.json ./keystone/package.json
COPY  --from=builder /app/package.json ./package.json

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "node /app/keystone/healthcheck.js" ]
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:./config/keystone.db
EXPOSE 3000
CMD yarn migrate:keystone && yarn start:keystone