FROM node:lts-buster-slim
WORKDIR /app
# RUN apk add libc6-compat
RUN apt-get update
RUN apt-get install openssl -y -qq
COPY ./keystone ./keystone
COPY  ./node_modules /app/node_modules
COPY ./package.json /app/package.json

ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV NODE_ENV=production
ARG SESSION_SECRET
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:./config/keystone.db
EXPOSE 3000
CMD yarn migrate:keystone && yarn start:keystone