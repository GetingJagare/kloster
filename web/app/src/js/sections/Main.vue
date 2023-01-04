<template>
  <common-section section-class="section section_about" id="about">
    <template #title>
      <h1 class="title text-center">{{ $root.__t('Кто мы есть') }}</h1>
    </template>
    <template #description>
      <div class="d-md-flex justify-content-between align-items-start">
        <div class="section__image">
          <img src="/images/main.jpg" :alt="$root.__t('Фотография исторического лагеря')"
               srcset="/images/main.jpg 1024w, /images/main.jpg 1280w"
               sizes="(max-width: 1024px) 1024px, (max-width: 1280px) 1280px" />
        </div>
        <div class="section__desc">
          <p>
            {{ $root.__t('Русь, Скандинавия, IX-XI вв.') }}<br>
            {{ $root.__t('Да, реконструкция, да...бесполезная?!...Мы просто делаем, что должны делать.') }}<br>
            {{ $root.__t('Единство системы, индивидуальность личности.') }}<br>
            {{ $root.__t('Создаём, воссоздаём, осветляем, просветляем.') }}<br>
            {{ $root.__t('Есть цели и стремление в движении безумного вектора.') }}<br>
            {{ $root.__t('Ты знаешь Монастырь?! Ты не куёшь и, не куя, не знаешь Монастырь...') }}
          </p>
          <p class="text-right">
            <cite>{{ $root.__t('Если душа просит, то надо открыть') }}</cite> (c)
          </p>
        </div>
      </div>
    </template>
  </common-section>
</template>

<script>
import CommonSection from "@js/ui/Section.vue";

export default {
  name: "Main",
  components: {
    CommonSection,
  }
}
</script>

<style scoped>

</style>
