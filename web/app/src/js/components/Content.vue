<template>
  <main>
    <main-section />
    <photo-section />
    <portfolio-section />
    <contact-section />
  </main>
</template>

<script>
import ContactSection from '@js/sections/Contacts.vue';
import MainSection from '@js/sections/Main.vue';
import PortfolioSection from '@js/sections/Portfolio.vue';
import PhotoSection from '@js/sections/Photos.vue';
export default {
  name: "Content",
  components: {
    ContactSection,
    MainSection,
    PortfolioSection,
    PhotoSection,
  }
}
</script>

<style>

</style>
