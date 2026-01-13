FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache git openssh ca-certificates
RUN corepack enable && corepack prepare pnpm@10.18.1 --activate

COPY package.json pnpm-lock.yaml* .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS dev

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NUXT_TELEMETRY_DISABLED=1

COPY . .

EXPOSE 3000 24678

CMD ["pnpm", "dev:container"]

FROM base AS build

COPY . .

RUN pnpm types:generate:icons && pnpm build

FROM node:22-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

COPY --from=build /app/.output /app/.output

EXPOSE 3000

USER nuxt

CMD ["node", "/app/.output/server/index.mjs"]
