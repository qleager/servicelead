
# Servicelead

Affiliate dashboard for a [CPA-Network](https://servicelead.ru)

## Stack
`Docker` `Nuxt 4` `Typescript` `ESLint` `Stylelint` `SCSS` `pnpm` `Storybook` `Yup` `EChart`

## Features
- **Consistent development environment**
- **Linting, Formatter, and Auto-fix scripts** `VS Code only`
- **Linting, Formatter, and Auto-fix styles** `VS Code only`
- **Linting, Formatter, and Auto-fix template** `VS Code only`
- **SCSS snippets** `VS Code only`
- **Docker-based isolation**

# 🚀 Get Started

## Before You Start

Please check the following before starting work on the project:

1. Read [ExampleComponent.vue](app/components/ExampleComponent.vue)
2. Review the [design system](app/assets/design-system) SCSS variables
3. Read about [SCSS snippets](#scss-snippets)
4. Check available [Composables](#use-composables)
5. Check available [Utils](#use-utils)
5. Check available [Page Meta](#use-page-meta)
6. Read about [Conventional Commits](#use-conventional-commits)

## Use Snippets
> [!Note]
> Currently available only in VS Code

Just start typing...

![Snippets Demo](docs/readme/snippets.gif)

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
#### `is` – get the class‑state @include from the style system
```scss
@include is($root-component-class-state) {
  display: none;
}
```
#### `theme` – get the theme @include
```scss
@include theme('dark' | 'light') {
  background: var(--ui-bg-muted);
}
```

## Use Conventional Commits

**Стркутура коммита:**  
`type`(`scope`): `subject`

`type`: Заголовок коммита, указывающего на специфику внесенных в кодовую базу изменений  
`scope`?: Область, бизнес-логика или логическая самостоятельная часть приложения, характеризующая фрагмент кода, которую затронули изменения (не обязательно)  
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
style: add space after function in Component  
docs(readme): add Use Conventional Commits block  
docs(AppButton): add jsondoc to props  

<details>
<summary>ℹ️ Подробнее про scope</summary>

### Основной принцип

`scope` определяется по бизнес-логике и функциональной самостоятельности, а не по структуре папок.

Он отвечает на вопрос:  
**какую часть продукта затрагивает этот коммит?**

Если часть приложения:
- имеет собственное назначение
- является самостоятельной логической единицей
- объединяет внутри себя страницы, компоненты и другую логику

то это и есть `scope`.

### Логические части приложения

Крупные функциональные области проекта, которые уже используются как `scope`:

- `offers`
- `news`
- `tickets`
- `finance`
- `statistics`
- `auth`
- `navigation`
- `layout`
- `types`
- `и другие`

### Примеры правильного использования

#### Страницы

Страница часто относится к самостоятельной логической части приложения.

Бывает сама по себе отдельным scope:
- `dashboard` → `scope: dashboard`

Бывает частью более большой scope:
- `/offers` → `scope: offers`
- страница одного оффера (`/offers/[id]`) → `scope: offers`

#### Компоненты

Имена компонентов не образуют `scope`, 
если не являются самостоятельной логической частью приложения или глобальным компонентом (components/app)

пример news/Entry.vue:

Правильно:  
`feat(news): add new fields to Entry`

Неправильно:  
`feat(entry): add new block`
`fix(newsEntry): update layout`

#### Глобальные компоненты (components/App)

Компоненты из папки `App` являются глобальными, поэтому их `scope` считается за них самих.

- `feat(AppIcon): add new size option`
- `fix(AppButton): correct disabled state styles`
- `style(AppTabs): align typography with design system`

#### Composables и бизнес-логика

`scope` определяется по бизнес-сущности, а не по месту использования.

- форма ввода SMS-кода → `auth`
- логика статусов тикетов → `tickets`

Примеры:
- `feat(auth): add sms code input form`
- `fix(tickets): correct status color mapping`

</details>

## Use Composables
- [useBreakpoints](docs/composables/use-breakpoints.md) — responsive breakpoint helpers
- [useConfirmDialog](docs/composables/use-confirm-dialog.md) — confirm dialog helper
- [useDocumentScrollLock](docs/composables/use-document-scroll-lock.md) — document scroll lock helper
- [useHighlighter](docs/composables/use-highlighter.md) — PrismJS syntax highlighting helper
- [useOverlay](docs/composables/use-overlay.md) — shared overlay manager
- [useTable](docs/composables/use-table.md) — TanStack-powered AppTable helper
- [useValidation](docs/composables/use-validation.md) — Yup validation with and without `AppForm`

## Use Utils
- [search](docs/utils/search.md) — Fuse.js search wrapper

## Use Page Meta

This section describes page metadata configured with `definePageMeta`

### Breadcrumbs

Use `breadcrumbs` in `definePageMeta` to show page breadcrumbs in `TheBreadcrumbs`

```ts
definePageMeta({
  breadcrumbs: [
    { label: 'Tickets', to: '/tickets' },
    { label: 'Ticket #123' },
  ],
})
```
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

Deployment is handled by GitHub Actions and GitHub Container Registry:

- a push to `main` updates production at `https://v7.servicelead.top`;
- a push to `staging` updates staging at `https://staging.servicelead.top` and Storybook at `https://storybook.servicelead.top`;
- the applications do not publish ports on the server—the shared Caddy instance proxies requests through the `servicelead-proxy` Docker network.

### Server setup

0. Update the server and create a user, for example, `deploy`.

1. Install Docker Engine with the Docker Compose plugin and verify the installation:

```bash
docker --version
docker compose version
docker ps
```

> [!important]
> The `deploy` user must be able to run Docker without `sudo`.

2. Create the deployment directories:

```bash
sudo mkdir -p /var/www/servicelead-production /var/www/servicelead-staging
sudo chown -R deploy:deploy /var/www/servicelead-production /var/www/servicelead-staging
```

The DNS records for `v7.servicelead.top`, `staging.servicelead.top`, and `storybook.servicelead.top` must point to the server IP address. Incoming ports `80/tcp`, `443/tcp`, and `443/udp` must be open.

The workflow starts Caddy from `docker-compose.proxy.yml` if the `caddy` container does not exist yet. If Caddy is already running from the previous Compose project, the workflow connects it to the shared network and reloads its configuration. The existing container must mount `/var/www/servicelead-production/Caddyfile` as `/etc/caddy/Caddyfile`.

3. Create a dedicated SSH key for GitHub Actions and add its public key to the deployment user:

> [!important]
> Do not use your personal SSH key for automated deployment.

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub deploy@server
```

### GitHub Secrets

Add the following secrets under `Settings → Secrets and variables → Actions`:

| Secret | Value |
| --- | --- |
| `HOST` | Server IP address or hostname |
| `USER` | SSH user, for example, `deploy` |
| `SSH_KEY` | Full contents of the private deployment key |
| `SSH_PASSPHRASE` | Deployment key passphrase |
| `PRODUCTION_APP_PATH` | `/var/www/servicelead-production` |
| `STAGING_APP_PATH` | `/var/www/servicelead-staging` |

Print the private key with:

```bash
cat ~/.ssh/github_actions_deploy
```

After setup, a push to `main` or `staging` automatically starts the corresponding deployment. The workflow creates the shared Docker network, connects Caddy, starts the required containers, checks their health, and only then reloads the Caddy configuration.


## 📥 Как именовать коммиты:
https://habr.com/ru/companies/yandex/articles/431432/
