<script lang="ts" setup>
</script>

<template>
  <div class="bar">
    <div class="bar__aggregate">
      <!-- это заполниткль -->
    </div>
    <div class="bar__item">
      <!-- тут корнер -->
      <!-- его вставляем кодом чтобы менять цвет на темной теме -->
      <SearchButton color="white" />
      <!-- тут корнер зеркально -->
    </div>
    <!-- и тут тоже заполнитель заполнтиль -->

    <!-- с остальными так же -->
    <NavigationActions />
    <TicketsButton />
  </div>
</template>

<style lang="scss">
.bar {
  display: flex;
}
</style>
