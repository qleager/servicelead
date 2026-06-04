<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'

interface Props {
  source: string
  trailingIcon?: boolean
}

interface Slots {
  default: []
}

const props = defineProps<Props>()
defineSlots<Slots>()

const classname = computed(() => [
  'copy-to-clipboard',
  { 'copy-to-clipboard-trailing-icon': props.trailingIcon },
  { 'copy-to-clipboard-copied': copied.value },
])

const { copy, copied } = useClipboard({ source: props.source })
</script>

<template>
  <AppTooltip
    :class="classname"
  >
    <button
      class="copy-to-clipboard__button"
      @click="copy(source)"
    >
      <slot />
      <AppIcon
        class="copy-to-clipboard__button-icon"
        :name="copied ? 'check_24' : 'Copy'"
      />
    </button>
    <template #content>
      <Transition
        mode="out-in"
        name="copy-to-clipboard__tooltip-transition"
      >
        <span
          :key="copied ? 'copied' : 'copy'"
          class="copy-to-clipboard__tooltip-text"
        >
          {{ copied ? 'Скопировано' : 'Скопировать' }}
        </span>
      </Transition>
    </template>
  </AppTooltip>
</template>

<style lang="scss">
.copy-to-clipboard {
  $this: &;
  $trailing-icon: $this + '-trailing-icon';
  $copied: $this + '-copied';

  display: inline-block;

  &__button {
    cursor: pointer;

    display: inline-flex;
    gap: $space-1;
    align-items: center;

    font: inherit;

    &:hover {
      color: var(--ui-color-text-muted)
    }

    @include is($trailing-icon) {
      flex-direction: row-reverse;
    }

    &-icon {
      color: $color-neutral-400;

      @include is($copied) {
        color: var(--ui-color-success);
      }
    }
  }

  &__tooltip {
    &-text {
      display: inline-block;
    }

    &-transition {
      &-enter {
        &-active {
          animation: fadeInUp $show-duration-sm ease-out forwards;
        }
      }

      &-leave {
        &-active {
          animation: fadeOutUp $hide-duration-sm ease-in forwards;
        }
      }
    }
  }
}
</style>
