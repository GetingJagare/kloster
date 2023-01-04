<template>
  <div class="langs header__langs text-center">
    <a href="/" :title="$root.__t('Русский')" class="langs__link header__langs-link" v-if="$root.lang !== 'ru'">
      <span class="flag-icon flag-icon-ru langs__icon header__langs-icon"></span>
    </a>
    <a href="/en" :title="$root.__t('Английский')" class="langs__link header__langs-link" v-if="$root.lang !== 'en'">
      <span class="flag-icon flag-icon-us langs__icon header__langs-icon"></span>
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
