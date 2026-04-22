<template>
  <StatisticsWidgetBase
    icon="arrow_forward"
    title="Трафик"
  >
    <template #value>
      <AppLabeledValue
        size="lg"
        value="340"
      >
        <template #trailingValue>
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
