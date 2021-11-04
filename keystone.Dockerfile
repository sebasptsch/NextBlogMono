FROM node:lts-buster-slim
WORKDIR /app
# RUN apk add libc6-compat
COPY  ./keystone/.keystone ./keystone/.keystone
COPY  ./keystone/node_modules ./keystone/node_modules
COPY  ./keystone/migrations ./keystone/migrations
COPY  ./keystone/package.json ./keystone/package.json
COPY  ./package.json ./package.json
COPY  ./keystone/schema.prisma ./keystone/schema.prisma

ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:./config/keystone.db

EXPOSE 3000
CMD yarn migrate:keystone && yarn start:keystone