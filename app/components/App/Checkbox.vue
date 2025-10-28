<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint | Record<string, any>
  name?: string // и все остальные своейтсвенные input checkbox
}
const model = defineModel<boolean>()
</script>

<template>
  <div :class="classname">
    <input
      v-model="model"
      class="checkbox__field"
      type="checkbox"
      hidden
    >
    <span class="checkbox__bullet">
      <AppIcon />
    </span>
    <span class="checkbox__label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="scss">
.checkbox {
  $this: &;

  &__label {
    &:empty {
      // так чуть экономим на произволительности, не используя v-if
      // и темплейт выглядит чище
      display: none;
    }
  }
}
</style>
