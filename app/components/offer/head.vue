<script lang="ts" setup>
import type { ButtonProps } from '~/components/App/Button.vue'
import type { TagProps } from '~/components/App/Button.vue'

interface Tag extends TagProps {
  label: string
}

interface Tab {
  label: string
  value: NonNullable<ButtonProps['value']>
  count?: number
}

interface Props {
  title?: string
  tags?: Tag[]
  statusLabel?: string
  statusTone?: 'success' | 'muted'
  rateLabel?: string
  ratePrefix?: string
  rateValue?: string | number
  rateCurrency?: string
  primaryActionLabel?: string
  tabs?: Tab[]
}

interface Emits {
  create: []
  next: []
  tabChange: [Tab['value']]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ремонт электрики',
  tags: () => [
    { label: 'Мастер на час' },
    { label: 'Топ гео', icon: 'geo_radar' },
    { label: 'Высокий спрос', icon: 'seasonal_demand' },
    { label: 'Действует акция', icon: 'top_fire' },
  ],
  statusLabel: 'Подключен',
  statusTone: 'success',
  rateLabel: 'Ставка',
  ratePrefix: 'до',
  rateValue: '1 200',
  rateCurrency: '₽',
  primaryActionLabel: 'Создать поток',
  tabs: () => ([
    { label: 'Статистика', value: 'stats' },
    { label: 'Информация', value: 'info' },
    { label: 'География', value: 'geo', count: 24 },
    { label: 'Прайс', value: 'price' },
  ]),
})

const emits = defineEmits<Emits>()

const model = defineModel<Tab['value']>({ required: false })

const classname = computed(() => [
  'offer-head',
  `offer-head-status-${props.statusTone}`,
])

const preparedTags = computed(() => props.tags.map(tag => ({
  ...tag,
  className: 'offer-head__tag',
})))

const preparedTabs = computed(() => props.tabs.map(tab => ({
  ...tab,
  isActive: model.value === tab.value,
})))

onBeforeMount(() => {
  if (!model.value) {
    model.value = props.tabs[0]?.value
  }
})

const onCreate = () => {
  emits('create')
}

const onNext = () => {
  emits('next')
}

const onTabClick = (value: Tab['value']) => {
  model.value = value
  emits('tabChange', value)
}
</script>

<template>
  <div :class="classname">
    <div class="offer-head__tags">
      <AppTag
        v-for="tag in preparedTags"
        :key="tag.label"
        :icon="tag.icon"
        :class="tag.className"
        :color="tag.color"
        :trailing-icon="tag.trailingIcon"
        :size="tag.size"
        :actionable="tag.actionable"
        :closable="tag.closable"
      >
        {{ tag.label }}
      </AppTag>
    </div>
    <div class="offer-head__title-rate">
      <div class="offer-head__title-row">
        <h2 class="offer-head__title">
          {{ props.title }}
        </h2>
        <div class="offer-head__status">
          <span class="offer-head__status-dot" />
          <span class="offer-head__status-text">
            {{ props.statusLabel }}
          </span>
        </div>
      </div>
      <div class="offer-head__rate">
        <div class="offer-head__rate-info">
          <div class="offer-head__rate-label">
            {{ props.rateLabel }}
          </div>
          <div class="offer-head__rate-value">
            <span class="offer-head__rate-prefix">{{ props.ratePrefix }}</span>
            <span class="offer-head__rate-number">{{ props.rateValue }}</span>
            <span class="offer-head__rate-currency">{{ props.rateCurrency }}</span>
          </div>
        </div>
        <div class="offer-head__rate-actions">
          <!-- TODO: AppButton не позволяет задать цвета бордера/иконки; переопределяем в CSS. -->
          <AppButton
            class="offer-head__arrow"
            icon="arrow_right"
            size="xs"
            variant="lined"
            color="lighter"
            aria-label="Перейти"
            @click="onNext"
          />
          <AppButton
            class="offer-head__cta"
            @click="onCreate"
          >
            {{ props.primaryActionLabel }}
          </AppButton>
        </div>
      </div>
    </div>
    <div class="offer-head__tabs">
      <!-- TODO: AppTabs не поддерживает счетчик, собираем на AppButton + AppTag. -->
      <AppButton
        v-for="tab in preparedTabs"
        :key="tab.value"
        class="offer-head__tab"
        size="md"
        variant="lined"
        color="lighter"
        :active="tab.isActive"
        @click="onTabClick(tab.value)"
      >
        <span class="offer-head__tab-label">{{ tab.label }}</span>
        <AppTag
          v-if="tab.count"
          class="offer-head__tab-count"
          size="md"
        >
          {{ tab.count }}
        </AppTag>
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.offer-head {
  $this: &;
  $status-success: $this + '-status-success';
  $status-muted: $this + '-status-muted';

  display: flex;
  flex-direction: column;
  gap: $space-8;

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-end;
  }

  &__title-rate {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__title-row {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    align-items: center;
  }

  &__title {
    margin: 0;
    line-height: 55px;
    color: $color-neutral-dark-950;

    @include text(bold, 5xl);
  }

  &__status {
    display: inline-flex;
    gap: $space-2;
    align-items: center;
  }

  &__status-dot {
    width: 12px;
    height: 12px;
    border-radius: 34px;
    background-color: $color-neutral-light-300;

    #{$status-success} & {
      background-color: $color-green;
    }
  }

  &__status-text {
    color: $color-neutral-light-400;

    @include text(regular, xs);

    #{$status-muted} & {
      color: $color-neutral-light-300;
    }
  }

  &__rate {
    display: flex;
    flex-wrap: wrap;
    gap: $space-8;
    align-items: flex-end;
  }

  &__rate-info {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    min-width: 200px;
  }

  &__rate-label {
    color: $color-neutral-dark-950;
    text-transform: uppercase;
    letter-spacing: 0.08em;

    @include text(regular, sm);
  }

  &__rate-value {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
  }

  &__rate-prefix,
  &__rate-currency {
    line-height: 33px;
    color: $color-neutral-dark-950;

    @include text(medium, 2xl);
  }

  &__rate-number {
    line-height: 55px;
    color: $color-neutral-dark-950;

    @include text(medium, 5xl);
  }

  &__rate-actions {
    display: flex;
    gap: $space-4;
    align-items: center;
  }

}
</style>
