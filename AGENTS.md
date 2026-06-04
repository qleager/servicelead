# AGENTS.md

<!-- ❇️ После изменения AGENTS.md попросить агента перечитать файл -->

## General
- В проекте используется VueUse.
- В проекте используется Lodash через префикс use.
- Компонент-ориентир для style guide: `./app/components/ExampleComponent.vue`.
- `rg` не установлен

## Components
- Порядок блоков в Vue SFC: `<script setup lang="ts">`, затем `<template>`, затем `<style lang="scss">`.

## Storybook
- Создаем только playground stories.
- Для отображения слота используем `AppTag:size-sm:color-gray`, а control задаем как boolean.
- Если слот повторяет проп, делаем слот с `control: text`.
- Для пропсов, которые визуально не меняют компонент, используем `{ category: 'behavioral props' }`.