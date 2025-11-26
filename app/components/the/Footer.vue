<script lang="ts" setup>
interface MenuItem {
  label?: string
  to: string
  icon: IconProps['name']
}
const menuItems: MenuItem[] = []
</script>

<template>
  <footer class="footer">
    <div class="footer__menu">
      <!-- <a
        v-for
        href=""
        class="footer__menu-item"
      /> -->
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  $this: &;

  height: 112px;
  border: 2px solid rgb(0 128 0 / 20%);

  &::before {
    content: 'TheFooter';
    color: rgb(0 128 0 / 50%);
  }
}
</style>
