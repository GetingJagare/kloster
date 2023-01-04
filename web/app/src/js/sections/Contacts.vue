<template>
  <common-section section-class="section section_even" id="contacts">
    <template #title>
      <h4 class="title title_smaller text-center">{{ $root.__t('Контакты') }}</h4>
    </template>
    <template #description>
      <p>
        {{ $root.__t('В данный момент располагаемся в Москве.') }}
      </p>
      <p>
        {{ $root.__t('Если у Вас возникли какие-либо вопросы, то можете написать напрямую на наш электронный адрес') }}
        <a href="mailto:mbd.kloster@yandex.ru" class="link link_dotted">mbd.kloster@yandex.ru</a>,
        {{ $root.__t('задать их через форму ниже или в один из наших аккаунтов в социальных сетях.') }}
      </p>
    </template>
    <template #content>
      <contact-form :name-text="$root.__t('Имя')"
                    :message-text="$root.__t('Ваш вопрос')"
                    :send-text="$root.__t('Отправить')"
                    :fill-text="$root.__t('Заполните это поле')"
                    :captcha-not-passed="$root.__t('Капча не пройдена!')"
                    :fields-not-filled="$root.__t('Не все поля заполнены!')"
                    :message-sent="$root.__t('Сообщение отправлено')"
                    :sending-error="$root.__t('Произошла ошибка при отправке!')" />
    </template>
  </common-section>
</template>

<script>
import ContactForm from '@js/components/ContactForm.vue';
import CommonSection from "@js/ui/Section.vue";

export default {
  name: "Contacts",
  components: {
    CommonSection,
    ContactForm
  },
}
</script>

<style>

</style>
