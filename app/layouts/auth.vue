<template>
  <div class="layout-auth">
    <div class="layout-auth__aside">
      <div class="layout-auth__aside-content">
        <NuxtImg
          class="layout-auth__logo"
          src="/images/logo-big-dark.svg"
        />

        <div class="layout-auth__title">
          Прямой рекламодатель — сами закрываем заявки
        </div>

        <div class="layout-auth__image" />

        <div class="layout-auth__bottom">
          <div class="layout-auth__copy">
            ServiceLead © 2026
          </div>
          <NuxtLink
            class="layout-auth__link"
            to="#"
          >
            Помощь и поддержка
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="layout-auth__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.layout-auth {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  min-height: 100dvh;

  &__aside {
    padding: $space-30 $space-30 $space-12 $space-30;
    border-radius: 0 $radius-9 $radius-9 0;

    // IDEA: добавить в ds gradients.scss?
    background: linear-gradient(150.23deg, rgb(146 179 220 / 50%) 1.69%, rgb(0 106 255 / 50%) 96.51%);

    &-content {
      display: flex;
      flex-direction: column;

      max-width: 707px;
      height: 100%;
      margin-left: auto
    }
  }

  &__logo {
    width: 214px;
    filter: brightness(0) invert(1);
  }

  &__title {
    max-width: 500px;
    margin-top: $space-30;

    @include text(semibold, 4xl);

    line-height: 1.4;
    color: #fff;
  }

  &__image {
    // IDEA: или просто NuxtImage с position: absolute?
    flex: 1;
    margin: -$space-12 (-$space-30) 0 0;
    background: url("images/auth-image.png") no-repeat right/contain;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
  }

  &__copy {
    @include text(medium, md);

    color: #fff;
  }

  &__link {
    @include text(medium, md);

    color: #fff;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
