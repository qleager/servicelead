<script lang="ts" setup>

</script>

<template>
  <section class="page-offer">
    <OffersSingleHeader />
    <OffersSingleTabs />
  </section>
</template>

<style lang="scss">
.page-offer {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-8;

  height: 100%;
  margin-top: -$space-9;
  padding-top: $space-9;

  background: url('/images/offers-single-head-image.png')
    no-repeat
    right top / auto 336px;
}
</style>
