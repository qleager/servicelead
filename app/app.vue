<template>
  <div class="bg">
    HELLO WORLD!
  </div>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<style lang="scss">
.bg {
  // TODO(Y): Ахуенно, то что я и имел ввиду
  @include text(bold, base);

  padding: $space-10;
  color: $color-yellow-800;
  color: $color-primary;
  background-color: $color-primary-300;

}
</style>
