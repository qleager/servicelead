FROM node:22-alpine@sha256:0340fa682d72068edf603c305bfbc10e23219fb0e40df58d9ea4d6f33a9798bf AS base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

COPY package.json pnpm-lock.yaml* .npmrc ./

RUN pnpm install --frozen-lockfile

FROM base AS local

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development
ENV NUXT_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=false

RUN apk add --no-cache git openssh ca-certificates

COPY . .

EXPOSE 3000 24678

FROM base AS build

COPY . .

RUN pnpm build

FROM node:22-alpine@sha256:0340fa682d72068edf603c305bfbc10e23219fb0e40df58d9ea4d6f33a9798bf AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NUXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

COPY --from=build /app/.output /app/.output

EXPOSE 3000

USER nuxt

CMD ["node", "/app/.output/server/index.mjs"]
