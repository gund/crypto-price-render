FROM node:18-alpine AS base
RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

FROM base AS build
# Disable NX daemon to avoid issues with docker builds
# See https://github.com/nrwl/nx/issues/12200
ENV NX_DAEMON false
WORKDIR /workspace
COPY ["../../../package-lock.json", "../../../package.json", "./"]
RUN npm install --force
COPY ../../../ .
RUN npx nx build crypto-price-render --prod

FROM base AS app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
WORKDIR /app
COPY ["../../../package-lock.json", "../../../package.json", "./"]
RUN npm install --force --production
COPY --from=build /workspace/dist/apps/crypto-price-render .
CMD ["node", "main.js"]
