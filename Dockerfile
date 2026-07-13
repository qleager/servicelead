# Base App
FROM node:24-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

RUN pnpm install

# Nuxt Dev
FROM base AS local

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development
ENV NUXT_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=false

RUN apk add --no-cache git openssh ca-certificates

COPY . .

EXPOSE 3000 24678

# Storybook Build
FROM base AS storybook-build

COPY . .

# limit of memory to fix fatal error heap out of memory
ENV NODE_OPTIONS="--max-old-space-size=3072"

RUN pnpm storybook:build

# Nuxt Build

FROM base AS build

COPY . .

# limit of memory to fix fatal error heap out of memory
ENV NODE_OPTIONS="--max-old-space-size=3072"

RUN pnpm build

# Nuxt Production
FROM node:24-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS production

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

# Storybook Production
FROM caddy:2.10.2-alpine AS storybook

WORKDIR /srv
COPY --from=storybook-build /app/storybook-static /srv

EXPOSE 6006

CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":6006"]
