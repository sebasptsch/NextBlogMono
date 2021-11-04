FROM node:lts-buster-slim as dependencies
RUN apt-get update
RUN apt-get install openssl -y
WORKDIR /app
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
COPY ../package.json ../yarn.lock ./package.json ./
RUN yarn install --frozen-lockfile


FROM node:lts-buster-slim as builder
RUN apt-get update
RUN apt-get install openssl -y
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build:frontend


FROM node:lts-buster-slim as production
WORKDIR /app
# RUN apk add libc6-compat
RUN apt-get update
RUN apt-get install openssl -y
COPY  --from=builder /app/keystone/.keystone ./keystone/.keystone
COPY  --from=builder /app/keystone/node_modules ./keystone/node_modules
COPY  --from=builder /app/keystone/migrations ./keystone/migrations
COPY --from=builder  /app/keystone/package.json ./keystone/package.json
COPY  --from=builder /app/package.json ./package.json
COPY --from=builder /app/keystone/schema.prisma ./keystone/schema.prisma

ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:./config/keystone.db

EXPOSE 3000
CMD yarn migrate:keystone && yarn start:keystone