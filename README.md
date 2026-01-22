# 🚀 Get Started

Проект использует **Docker + Dev Containers**.  
После клонирования репозитория проекта, действия по установке и запуску выполняются **через VS Code**.

## Stack
`Docker` `Nuxt 4` `Typescript` `ESLint` `Stylelint` `SCSS` `pnpm` `Storybook`

## Features
- **Consistent development environment**
- **Linting, Formatter, and Auto-fix scripts** `VS Code only`
- **Linting, Formatter, and Auto-fix styles** `VS Code only`
- **SCSS snippets** `VS Code only`
- **Docker-based isolation**

## Use Snippets

Just start typing...

![Snippets Demo](docs/readme/snippets.gif)


> [!Note]
> Currently available only in VS Code

### SCSS Snippets

#### `text` – get text typography @mixin
```scss
@include text(regular, sm);
```
#### `label` – get label typography @mixin
```scss
@include label(md, medium);
```
#### `color` – get color palette $variable
```scss
background: $color-neutral-50;
```
#### `radius` – get border radius $variable
```scss
border-radius: $radius-2;
```
#### `space` – get spacing $variable
```scss
gap: $space-2;
```
#### `duration` – get duration $variable
```scss
transition: $duration-blur-sm;
```

#### `ixxl`, `ixl`, `ilg`, `imd`, `ism`, `ixs` – get media query @mixin
```scss
@include xs {
  display: none;
}
```

## Use Conventional Commits

**Стркутура коммита:**  
`type`(`scope`): `subject`

`type`: Заголовок коммита, указывающего на специфику внесенных в кодовую базу изменений  
`scope`?: Область, характеризующая фрагмент кода, которую затронули изменения (не обязательно)  
`subject`: Описание в повелительном наклонении (imperative mood)

| Types         | Is                                                              |
| ------------- | --------------------------------------------------------------- |
| build         | Сборка проекта или изменения внешних зависимостей               |
| ci            | Настройка CI и работа со скриптами                              |
| docs          | Обновление документации                                         |
| feat          |	Добавление нового функционала                                   |
| fix           |	Исправление ошибок                                              |
| perf          | Изменения направленные на улучшение производительности          |
| refactor      |	Правки кода без исправления ошибок или добавления новых функций |
| revert        |	Откат на предыдущие коммиты                                     |
| style	        | Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)      |
| chore         |	Изменения, не связанных напрямую с кодом приложения             |
| test	        | Добавление тестов                                               |

**Примеры:**  
fix(offer): error when save offer to favorite  
feat(AppIcon): setup component  
style: add props comment at AppComponent  
docs(readme): add Use Conventional Commits block

> [!Tip]
> Папки, в которых лежат компоненты, по факту уже и есть `scope`.  
> Кроме App, раз они глобальные, то считаем их `scope` – за них самих

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
pnpm dev:container
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

## How to run on a VPS

1. Install Docker and Docker Compose
> [!important]
> Don’t forget to enable Docker service auto-start and add your user to the `docker` group (so you can run Docker without sudo)

2. Clone the repository:
```bash
git clone git@github.com:qleager/servicelead.git
```

3. Go to the cloned repository directory:
```bash
cd servicelead
```

4. Start:
```bash
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build
```

## How to update
```bash
cd /to/project/directory/
git pull
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build
```


## 📥 Как именовать коммиты:
https://habr.com/ru/companies/yandex/articles/431432/
