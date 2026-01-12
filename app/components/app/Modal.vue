<script lang="ts" setup>
interface Props {
  title?: string
  overlay?: boolean // def true -- вкл/вкл подложку под модалкой
  portal?: TeleportProps['to'] // def: body
}

const model = defineModel<boolean>() // def: false
</script>

<template>
  <!-- default-slot триггер на открытие/закрытие окна -->
  <AppOverlay>
    <div class="modal">
      <header class="modal__header">
        <div class="modal__header-title">
          <div
            v-if="!$slots.title"
            class="modal__title"
          >
            {{ title }}
          </div>
          <div class="modal__slot modal__slot-title">
            <slot name="title" />
          </div>
        </div>
        <div class="modal__header-description">
          <div
            v-if="!$slots.tidescriptiontle"
            class="modal__description"
          >
            {{ description }}
          </div>
          <div class="modal__slot modal__slot-description">
            <slot name="description" />
          </div>
        </div>
      </header>
      <div class="modal__main">
        <slot name="content" />
      </div>
      <footer class="modal__footer">
        <slot name="footer" />
      </footer>
    </div>
  </AppOverlay>
</template>

<style></style>
