<script setup lang="ts">
import { copyToClipboard } from '~/utils/copyToClipboard'

interface Props {
  data?: ParametersData[]
}

interface ParametersData {
  items?: ParametersItem[]
  key: string
  title?: string
}

interface ParametersItem {
  isCopyable?: boolean
  key: string
  label: string
  value?: ParametersValue
}

type ParametersValue = string | string[] | number | boolean | null

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const openedSections = reactive(
  Object.fromEntries(
    props.data.map((section, index) => [section.key, index === 0 ? true : false]),
  ) as Record<string, boolean>,
)

const isArray = (value?: ParametersValue): value is string[] => {
  return Array.isArray(value)
}

const isBoolean = (value?: ParametersValue): value is boolean => {
  return typeof value === 'boolean'
}

const isSingleColumnSection = (section: ParametersData) => {
  const items = section.items ?? []

  return items.length > 0 && items.every(item => isBoolean(item.value))
}

const getPrimaryValue = (value?: ParametersValue) => {
  return Array.isArray(value) ? value[0] ?? '-' : value
}

const getExtraValues = (value?: ParametersValue) => {
  return Array.isArray(value) ? value.slice(1) : []
}

const hasExtraValues = (value?: ParametersValue) => {
  return Array.isArray(value) && value.length > 1
}

const onCopy = (value?: ParametersValue) => {
  return value != null && copyToClipboard(String(value))
}

export type { ParametersData as ThreadParameters }
</script>

<template>
  <AppWidget
    class="thread-single-parameters"
    icon="filter"
    title="Параметры потока"
  >
    <template #content>
      <AppCollapse
        v-for="section in data"
        :key="section.key"
        v-model="openedSections[section.key]"
        class="thread-single-parameters__section"
      >
        <div
          v-if="section.title"
          class="thread-single-parameters__section-head"
        >
          {{ section.title }}
          <AppIcon
            name="dropdown"
          />
        </div>
        <template #content>
          <div
            class="thread-single-parameters__section-content"
            :class="{
              'thread-single-parameters__section-content--single-column': isSingleColumnSection(section),
            }"
          >
            <div
              v-for="param in section.items"
              :key="param.key"
              class="thread-single-parameters__param"
            >
              <div class="thread-single-parameters__param-label">
                {{ param.label }}
              </div>
              <div class="thread-single-parameters__param-value">
                <template v-if="isArray(param.value)">
                  {{ getPrimaryValue(param.value) }}
                  <AppDropdown
                    v-if="hasExtraValues(param.value)"
                    mode="hover"
                  >
                    <template #default>
                      <AppTag
                        color="neutral"
                        size="sm"
                        variant="soft"
                      >
                        +{{ getExtraValues(param.value).length }}
                      </AppTag>
                    </template>
                    <template #content>
                      <div class="thread-single-parameters__extra-tooltip">
                        <div
                          v-for="extraValue in getExtraValues(param.value)"
                          :key="extraValue"
                          class="thread-single-parameters__extra-tooltip-item"
                        >
                          {{ extraValue }}
                        </div>
                      </div>
                    </template>
                  </AppDropdown>
                </template>
                <template v-else-if="isBoolean(param.value)">
                  <AppTag
                    :color="param.value ? 'green' : 'neutral'"
                    size="sm"
                    variant="soft"
                  >
                    {{ param.value ? 'Включен' : 'Выключен' }}
                  </AppTag>
                </template>
                <template v-else>
                  {{ param.value }}
                </template>
                <AppButton
                  v-if="param.isCopyable"
                  class="thread-single-parameters__copy-btn"
                  color="neutral"
                  icon="Copy"
                  size="xs"
                  variant="link"
                  @click="onCopy(param.value)"
                />
              </div>
            </div>
          </div>
        </template>
      </AppCollapse>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.thread-single-parameters {
  &__section {
    $section: &;

    @include text(medium, md);

    &:not(:first-child) {
      margin-top: $space-4;
      padding-top: $space-4;
      border-top: 1px solid $color-neutral-150;

      #{$section}-content {
        padding-top: $space-6;
      }
    }

    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
    }

    &-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $space-4 $space-14;

      &--single-column {
        grid-template-columns: 1fr;
      }
    }
  }

  &__param {
    display: flex;
    justify-content: space-between;

    &-label {
      @include text(regular, sm);

      color: $color-neutral;
    }

    &-value {
      display: flex;
      gap: $space-2;
      align-items: center;
      color: $color-neutral-950;

      @include text(regular, md);
    }
  }

  &__copy-btn {
    margin: -$space-1;
  }

  &__extra-tooltip {
    display: flex;
    flex-direction: column;
    gap: $space-05;

    &-item {
      white-space: nowrap;
    }
  }
}
</style>
