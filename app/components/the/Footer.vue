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
      <a
        v-for
        href=""
        class="footer__menu-item"
      />
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  $this: &;
}
</style>
