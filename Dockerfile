FROM node:22-alpine

# Рабочая папка внутри контейнера
WORKDIR /app

# Включаем pnpm через corepack (рекомендуемый способ)
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# Копируем только манифесты сначала — кэшируем установку deps
COPY package.json pnpm-lock.yaml* .npmrc ./

# Ставим зависимости один раз на этапе сборки
RUN pnpm install --frozen-lockfile

# Докидываем остальное приложение
COPY . .

# Nuxt dev: 3000; Vite HMR: 24678 (важно для hot reload из-под Docker)
EXPOSE 3000 24678

# Запускаем dev-сервер Nuxt, слушая все интерфейсы
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]