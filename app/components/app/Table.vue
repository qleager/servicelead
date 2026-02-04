<script lang="ts" setup>
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row table__row-head">
        <th
          v-for="col in 4"
          :key="col"
          class="table__cell table__cell-head"
        >
          Lorem
        </th>
      </tr>
    </thead>

    <tbody class="table__body">
      <tr
        v-for="row in 5"
        :key="row"
        class="table__row table__row-body"
      >
        <td
          v-for="col in 4"
          :key="col"
          class="table__cell table__cell-body"
        >
          Lorem ipsum
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
  $this: &;

  border-collapse: collapse;

  &__head {
    @include text(regular, xs);

    color: $color-neutral-400;
    text-transform: uppercase
  }

  &__body {
    @include text(regular, sm);
  }

  &__cell {
    min-width: 107px;
    height: $space-10;
    padding-inline: $space-2;

    text-align: end;
    vertical-align: middle;

    &:first-child {
      min-width: 223px;
      text-align: start;
    }

    &-head {
      height: $space-6;
    }
  }
}
</style>
