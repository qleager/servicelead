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
          Lorem ipsum dolor sit amet consectetur.
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores perferendis nostrum sapiente.
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
    @include label(regular, md);

    position: sticky;
    top: 0;

    color: $color-neutral-400;
    text-align: left;

    backdrop-filter: blur(20px) brightness(1.1);
  }

  &__body {
    @include text(regular, sm);
  }

  &__cell {
    padding: $space-3 $space-3;
    border: 1px solid transparent;

    &-head {
      padding: $space-2 $space-3;
      font-weight: inherit;
    }
  }
}
</style>
