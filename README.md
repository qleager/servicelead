# Get Started

Make sure to install Docker

```bash
# При первом запуске
docker compose up --build

# Запустить (в директории проекта)
docker compose up

# Остановить (в директории проекта)
docker compose down

# Устанвить пакет
docker compose exec web pnpm i <package-name>
# или через интерфейс Docker Desktop во вкладке exec контейнера проекта
```

Как именовать коммиты:
https://habr.com/ru/companies/yandex/articles/431432/
