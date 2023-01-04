<template>
  <footer class="d-md-flex footer">
    <div class="container d-md-flex justify-content-between align-items-center">
      <div class="footer__socials d-flex d-md-block align-items-center">
        <socials/>
        <lang/>
      </div>
      <div class="footer__copyright">
        {{ $root.__t('Мастерская Былых Дел') }} &copy;, {{ year }}
      </div>
    </div>
  </footer>
</template>

<script>
import Socials from "./Socials.vue";
import Lang from "./Lang.vue";

export default {
  name: "Footer",
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.year = (new Date()).getFullYear();
  },
  components: {
    Socials,
    Lang,
  }
}
</script>

<style scoped>

</style>
