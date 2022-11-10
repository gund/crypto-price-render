FROM node:18-alpine AS build
WORKDIR /workspace
COPY ["./package.json", "./pnpm-*.yaml", "./"]
RUN npm ci
COPY . .
RUN npx nx build crypto-price-render --prod

FROM node:18-alpine AS host
ENV NODE_ENV=production
WORKDIR /app
COPY ["./package.json", "./pnpm-*.yaml", "./"]
RUN npm ci --omit=dev
COPY --from=build /workspace/dist/apps/crypto-price-render .
CMD ["node", "main.js"]
