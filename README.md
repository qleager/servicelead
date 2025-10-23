# 🚀 Get Started

Проект использует **Docker + Dev Containers**.  
После клонирования репозитория проекта, действия по установке и запуску выполняются **через VS Code**.

## Stack
`Docker` `Nuxt 4` `Typescript` `ESLint` `Stylelint` `SCSS` `pnpm`

## Features
- **Consistent development environment**
- **Linting, Formatter, and Auto-fix scripts** `VS Code only`
- **Linting, Formatter, and Auto-fix styles** `VS Code only`
- **SCSS snippets** `VS Code only`
- **Docker-based isolation**

## Use Snippets

Рассказать обо всех и показать gif использования

## 📦 Требования

Перед началом убедитесь, что установлено:

- ✅ **Docker Desktop / Docker Engine**
- ✅ **VS Code**
- ✅ **Расширение Dev Containers** (`ms-vscode-remote.remote-containers`)

---

## ⚙️ Запуск проекта

### 1. Откройте проект в VS Code

При первом открытии VS Code предложит установить Dev Containers:

![Скрин предложения VS Code](https://i.postimg.cc/mrxV2Z1L/image.png)

Если не предложил — установите расширение вручную:  
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

---

### 2. Откройте проект в контейнере

После установки расширения VS Code обнаружит конфиг `.devcontainer/devcontainer.json` и предложит собрать образ и открыть контейнер:

![Скрин предложения VS Code 2](https://i.postimg.cc/kgyF9NCH/image.png)

Также можно открыть контейнер вручную (или пересобрать образ и открыть):

> **Ctrl + Shift + P → Dev Containers: Reopen in Container**

![Открытие командой](https://i.postimg.cc/JnTHdKbT/image.png)

После сборки вы автоматически окажетесь в среде контейнера (`Dev Container`).

Контейнер будет виден в Docker Desktop.
  
---

### 3. Запуск nuxt в dev режиме в терминале VS Code в конейнере

```bash
pnpm dev:docker
```

---

## 📥 Установка пакетов

Все зависимости ставятся **только внутри контейнера**, в терминале VS Code.

```bash
pnpm i <package-name>
```

Установка Nuxt-модулей

```bash
npx nuxi module add <module-name>
```

Пример установки пакета из терминала внутри контейнера:

![Терминал внутри контейнера](https://i.postimg.cc/qMNvppTk/image.png)

## 📥 Как именовать коммиты:
https://habr.com/ru/companies/yandex/articles/431432/