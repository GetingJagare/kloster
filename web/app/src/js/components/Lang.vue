<template>
  <div class="langs header__langs text-center">
    <a href="/" :title="$root.__t('Русский')" class="langs__link header__langs-link d-flex align-items-center"
       v-if="$root.lang !== 'ru'">
      <span class="fi fi-ru langs__icon header__langs-icon"></span>
    </a>
    <a href="/en" :title="$root.__t('Английский')" class="langs__link header__langs-link d-flex align-items-center"
       v-if="$root.lang !== 'en'">
      <span class="fi fi-us langs__icon header__langs-icon"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Lang"
}
</script>

<style>

</style>
