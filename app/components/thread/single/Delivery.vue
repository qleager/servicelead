<script lang="ts" setup>
const code1 = `<script src="https://lk.newapi.ru/stat/51326/js"></scr` + `ipt>`

const code2 = `<form class="sltop__form"
  action="https://newapi.ru/ct/addorders?idg">

  <h2>Заказ звонка</h2>

  <p>
    <input name="fullname"
      type="text"
      placeholder="Как к вам обращаться">
  </p>

  <p>
    <input name="phone"
      type="tel"
      placeholder="+7 999 123-45-67">
  </p>

  <p>
    <textarea name="work"
      placeholder="Опишите задачу"></textarea>
  </p>

  <!-- Скрытые поля -->
  <input type="hidden" name="sub_id" value="">
  <input type="hidden" name="input" value="1">

  <button type="submit">Отправить заявку</button>

</form>`

const code3 = `// Кодирование данных формы в URL-строку
function urlEncodeFormData(fd) {
  if (typeof URLSearchParams === "function") {
    var params = new URLSearchParams();
    for (var pair of fd.entries()) {
      if (typeof pair[1] == "string")
        params.append(pair[0], pair[1]);
    }
    return params.toString();
  } else {
    var s = "";

    function encode(s) {
      return encodeURIComponent(s)
        .replace(/%20/g, "+");
    }

    for (var pair of fd.entries()) {
      if (typeof pair[1] == "string") {
        s += (s ? "&" : "")
          + encode(pair[0])
          + "="
          + encode(pair[1]);
      }
    }
    return s;
  }
}`

const code4 = `[tel* phone]
[cf7sl thread="51308" token="a6eee6daed2519e996bd2a3d3e9231d2"]`

const code5 = `<!-- Имя клиента -->
<label>Ваше имя
    [text fullname placeholder "Как к вам обращаться"]</label>

<!-- Телефон (обязательное) -->
<label>Телефон
    [tel* phone placeholder "+7 999 123-45-67"]</label>

<!-- Описание задачи -->
<label>Что нужно сделать
    [textarea work placeholder "Опишите задачу"]</label>

<!-- Интеграция с ServiceLead -->
[cf7sl thread="51308" token="a6eee6...9231d2"]

[submit "Отправить заявку"]`

const code6 = `[select* branch_id "Москва|36" "Нижний Тагил|69" "Абакан|142"]`

const code7 = `<div id="sltop__form_placeholder_51325"></div>
<script>
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.onload = function () {
  document.getElementById("sltop__form_placeholder_51325").innerHTML = this.response;
  Array.from(document.getElementById("sltop__form_placeholder_51325").getElementsByTagName("script")).forEach(
  el => eval(el.innerHTML));
  };
  xhr.open("GET", "https://lk.newapi.ru/form/101/51325/html", true);
  xhr.send();\n</scr` + `ipt>`
</script>

<template>
  <AppWidget
    class="thread-single-delivery"
    icon="cursor"
    title="Передача лидов"
  >
    <template #trailingHeader>
      <!-- IDEA: должен быть отдельный компонент?
       аннотация от дизов: https://www.figma.com/design/F3e8GZ7C0AG1RSR1WltJeE/lk-SL-2.0--Copy-?node-id=16162-107051&t=WGVMVbthaBW3qGbg-4 -->
      <AppTooltip>
        <div class="thread-single-delivery__tip">
          <AppIcon
            name="bulb"
            :size="16"
          />
        </div>
        <template #content>
          Добавьте ссылку на ваш профиль Avito, чтобы клиенты могли оставить отзыв.
        </template>
      </AppTooltip>
    </template>

    <template #content>
      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__landing">
          <div class="thread-single-delivery__landing-title">
            Ссылка на лендинг
          </div>

          <div class="thread-single-delivery__landing-field">
            <a
              class="thread-single-delivery__landing-link"
              href="computerovichkoff.ru"
              target="_blank"
            >
              computerovichkoff.ru
            </a>

            <AppCopyToClipboard
              source="computerovichkoff.ru"
            />
          </div>
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Код для статистики
          </div>

          <div class="thread-single-delivery__description">
            Вставьте этот скрипт на сайт. Он отслеживает переходы и передаёт данные в систему.
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          <AppCode
            :code="code1"
            lang="markup"
            title="HTML · вставить перед </head>"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Готовый пример формы
          </div>

          <div class="thread-single-delivery__description">
            HTML-форма для сбора заявок. Скопируйте и вставьте на свой сайт.<br>
            Стилизуйте под ваш дизайн — важны только имена полей.<br>
            Поля: имя [fullname], телефон [phone], комментарий [work].
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          <AppAlert>Класс [sltop__form] — обязательный. Без него скрипт статистики не отследит отправку.</AppAlert>
          <AppCode
            :code="code2"
            lang="markup"
            title="HTML · Contact Form"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Скрипт отправки
          </div>

          <div class="thread-single-delivery__description">
            JavaScript для отправки формы без перезагрузки страницы. Подключите, если хотите обрабатывать форму через AJAX.
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          <AppAlert>
            Этот скрипт нужен только при кастомной отправке.<br>
            Если форма отправляется стандартным submit — он не нужен.
          </AppAlert>
          <AppCode
            :code="code3"
            lang="javascript"
            title="JavaScript · Contact Form"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Инструкция
          </div>

          <div class="thread-single-delivery__description">
            Чтобы заявки с сайта поступали в систему, установите два плагина и настройте форму.
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          AppStepper.vue
          <AppCode
            :code="code4"
            lang="javascript"
            title="Скрипт"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Готовый пример формы
          </div>

          <div class="thread-single-delivery__description">
            Скопируйте целиком в редактор Contact Form 7.<br>
            Поля: имя [fullname], телефон [phone], комментарий [work].
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          AppStepper.vue
          <AppCode
            :code="code5"
            lang="markup"
            title="HTML · Contact Form 7"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Выбор города в форме
          </div>

          <div class="thread-single-delivery__description">
            Если клиент сам выбирает город — добавьте поле branch_id.
            Значения должны совпадать с ID городов в системе
            (<NuxtLink
              class="thread-single-delivery__link"
              to="/dashboard"
            >список городов</NuxtLink>).
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          <AppAlert>
            Для одного города или автоопределения по IP — это поле не нужно.
          </AppAlert>
          <AppCode
            :code="code6"
            lang="markup"
            title="HTML · Contact Form 7"
          />
        </div>
      </div>

      <div class="thread-single-delivery__section">
        <div class="thread-single-delivery__section-head">
          <div class="thread-single-delivery__title">
            <AppIcon
              class="thread-single-delivery__title-icon"
              name="dot"
              :size="16"
            />
            Код формы
          </div>

          <div class="thread-single-delivery__description">
            Скопируйте код ниже и вставьте туда, где должна появиться форма.
          </div>
        </div>

        <div class="thread-single-delivery__section-content">
          <AppAlert>
            Размещаете несколько форм на одном сайте?<br>
            В каждой копии меняйте id в трёх местах: вторая форма — sltop__form_placeholder_51325-2, третья — sltop__form_placeholder_51325-3 и так далее.
          </AppAlert>
          <AppCode
            :code="code7"
            lang="markup"
            title="HTML"
          />
        </div>
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.thread-single-delivery {
  &__section {
    display: flex;
    flex-direction: column;
    gap: $space-8;

    &:nth-child(n+2) {
      margin-top: $space-6;
      padding-top: $space-6;
      border-top: 1px solid $color-neutral-150;
    }

    &-head {
      display: flex;
      flex-direction: column;
      gap: $space-2;
      max-width: 730px;
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: $space-8;
    }
  }

  &__title {
    display: flex;
    gap: $space-2;
    align-items: center;

    @include text(medium, md);

    &-icon {
      color: $color-primary;
    }
  }

  &__description {
    @include text(regular, sm);

    color: $color-neutral;
  }

  &__link {
    color: $color-primary;

    &:hover {
      text-decoration: none;
    }
  }

  &__landing {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    max-width: 600px;

    &-title {
      @include label(regular, md);
    }

    &-field {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: $space-3 $space-2 $space-3 $space-4;
      border: 1px solid $color-neutral-300;
      border-radius: $space-2;
    }

    &-link {
      color: $color-primary;

      &:hover {
        text-decoration: none;
      }
    }

    &-copy-btn {
      margin: -$space-6 (-$space-3) (-$space-6) 0;
    }
  }

  &__tip {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    border-radius: 50%;

    color: $color-yellow-500;

    background-color: $color-yellow-100;
  }
}
</style>
