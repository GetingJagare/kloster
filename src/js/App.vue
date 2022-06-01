<template>
  <div class="app" :style="{paddingTop: `${bodyPaddingTop}px`}">
    <navbar/>
  </div>
</template>

<script>
import config from "@js/../../config/index.json";
import Navbar from "@js/components/Navbar.vue";
import {decode} from "@js/helpers/html.js";

export default {
  name: "App",
  data() {
    return {
      config,
      translations: {},
      lang: '',
      bodyPaddingTop: 0,
    };
  },
  mounted() {
    this.bodyPaddingTop = document.querySelector('.header').offsetHeight;
    this.config = config;

    this.setLang();
    this.setTranslations();
  },
  methods: {
    setLang() {
      const {langs} = this.config,
          {pathname} = window.location;

      for (const l of langs) {
        if ((new RegExp(`\/${l}`)).test(pathname)) {
          this.lang = l;
          break;
        }
      }
    },
    async setTranslations() {
      if (!this.lang) {
        return;
      }

      const translations = await import(`@/../../translations/${this.lang}.json`);
      this.translations = translations.default;
      console.log(this.translations)
    },
    __t(phrase) {
      if (!this.lang) {
        return phrase;
      }

      phrase = decode(phrase);
      return this.translations && this.translations[phrase] ? this.translations[phrase] : phrase;
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>
