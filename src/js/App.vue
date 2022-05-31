<template>
  <div class="app" :style="{paddingTop: `${bodyPaddingTop}px`}">
    <navbar />
  </div>
</template>

<script>

import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  data() {
    return {
      bodyPaddingTop: 0,
    };
  },
  mounted() {
    this.bodyPaddingTop = document.querySelector('.header').offsetHeight;
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>
