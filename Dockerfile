FROM node:18-alpine AS build
WORKDIR /workspace
RUN npm install -g pnpm
COPY ["./package.json", "./pnpm-*.yaml", "./"]
RUN pnpm install --frozen-lockfile
COPY . .
RUN npx nx build crypto-price-render --prod

FROM node:18-alpine AS host
ENV NODE_ENV=production
WORKDIR /app
RUN npm install -g pnpm
COPY ["./package.json", "./pnpm-*.yaml", "./"]
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /workspace/dist/apps/crypto-price-render .
CMD ["node", "main.js"]
