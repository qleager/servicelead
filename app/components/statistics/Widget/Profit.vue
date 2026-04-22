<template>
  <StatisticsWidgetBase
    class="statistics-widget-profit"
    icon="money"
    title="Заработано"
  >
    <template #value>
      <AppLabeledValue
        size="lg"
        value="26 000"
      >
        <template #trailingValue>
          ₽
          <AppTag
            color="green"
            icon="arrow_up"
            size="sm"
            trailing-icon
            variant="soft"
          >
            +7
          </AppTag>
        </template>
      </AppLabeledValue>
    </template>
  </StatisticsWidgetBase>
</template>
