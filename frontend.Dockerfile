FROM node:lts-buster-slim
WORKDIR /app
# RUN apk add libc6-compat
COPY ./frontend/public ./frontend/public
COPY  ./frontend/.next ./frontend/.next
COPY  ./node_modules ./node_modules
COPY  ./package.json ./package.json
COPY  ./frontend/package.json ./frontend/package.json
COPY  ./frontend/next.config.js ./frontend/next.config.js

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD yarn start:frontend