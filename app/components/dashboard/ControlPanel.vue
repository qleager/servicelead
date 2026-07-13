<script lang="ts" setup>

</script>

<template>
  <AppSection
    class="control-panel"
    title="Элементы управления"
  >
    <template #content>
      <div class="control-panel__content">
        <ThreadWidget class="control-panel__threads" />
        <ToolTelephonyWidget class="control-panel__telephony" />
        <ToolDomainWidget class="control-panel__domains" />
      </div>
    </template>
  </AppSection>
</template>

<style lang="scss">
.control-panel {
  &__content {
    display: grid;
    grid-template:
      'threads threads threads telephony'
      'threads threads threads domains';
    gap: $space-4;
  }

  &__threads {
    grid-area: threads;
  }

  &__telephony {
    grid-area: telephony;
  }

  &__domains {
    grid-area: domains;
  }
}
</style>
