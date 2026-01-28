<!-- TODO:
  Описал необходимые состоявляющие

  по факту теперь надо взять дизайн c AppWidget, который ты обновил, и применить здесь
  + типы описать
 -->
<script lang="ts" setup>
interface Props {
  ico?: unknown
  title?: unknown
  centerd?: unknown
}

interface Slots {
  header: unknown
  default: unknown
  footer: unknown
}

const classname = computed(() => [
  'card',
  {
    'card-centered': props.centered,
  },
])
</script>

<template>
  <div class="classname">
    <header class="card__header">
      <AppIcon
        v-if="icon"
        class="card__icon"
      />
      <div
        v-if="title"
        class="card__title"
      >
        {{ title }}
      </div>
      <slot name="header" />
    </header>

    <div class="card__main">
      <slot />
    </div>

    <footer class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss">
.card {
  $this: &;
  $centered: $this + '-centered';

  &__header {
    display: flex;

    #{$centered} & {
      justify-content: center;
    }
  }

  &__main {
    display: flex;

    #{$centered} & {
      justify-content: center;
    }
  }

  &__footer {
    display: flex;

    #{$centered} & {
      justify-content: center;
    }
  }
}
</style>
