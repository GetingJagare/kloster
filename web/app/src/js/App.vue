<template>
  <navbar ref="navbar" @nav-item:clicked="navItemClicked"/>
  <content />
  <bottom />
</template>

<script>
import Navbar from "@js/components/Navbar.vue";
import Bottom from "@js/components/Bottom.vue";
import Content from "@js/components/Content.vue";

export default {
  name: "App",
  data() {
    return {
      scrollTop: 0,
      scrollTopMax: 100,
      translations: {},
      defaultLang: '',
      lang: '',
    };
  },
  mounted() {
    this.translations = JSON.parse(decodeURIComponent(window.translations));
    this.defaultLang = window.defaultLang;
    this.lang = window.lang;

    window.onscroll = () => {
      this.checkWindowScrollTop();
      this.checkInWhatSection();
    };
  },
  updated () {
    this.checkWindowScrollTop();
  },
  methods: {
    __t(str) {
      return this.translations[str] || str;
    },
    checkWindowScrollTop () {
      this.$refs.navbar.sticky = window.scrollY >= this.scrollTopMax;
    },
    navItemClicked(event, index) {
      this.scrollTop = document.querySelector(event.target.hash).offsetTop + (window.width >= 768 ? -this.$refs.navbar.$el.offsetHeight : 0);

      window.scrollTo({
        top: index > 0 ? this.scrollTop : index,
        behavior: 'smooth',
      });
    },
    checkInWhatSection () {
      document.querySelectorAll('.section').forEach((s, i) => {
        const scrollTop = window.scrollY,
            minScrollTop = i > 0 ? s.offsetTop : 0;

        if (scrollTop >= minScrollTop && scrollTop < s.offsetTop + s.offsetHeight) {
          this.$refs.navbar.activeItemIndex = i;
        }
      });
    },
  },
  components: {
    Content,
    Navbar,
    Bottom,
  },
}
</script>

<style>

</style>
