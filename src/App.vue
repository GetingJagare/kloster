<template>
  <main style="padding-top: 112px;">
    <Section
      id="about"
      :title="t('Кто мы есть')"
    >
      <first-section />
    </Section>

    <Section
      id="photo"
      classes="section_even gallery"
    >
      <div />
    </Section>

    <Section id="portfolio">
      <div />
    </Section>

    <Section
      id="contacts"
      classes="section_even"
    >
      <div />
    </Section>
  </main>
</template>

<script>
    import axios from 'axios';

    import VueGallery from 'vue-gallery';
    import VueOwlCarousel from 'vue-owl-carousel';
    import FirstSection from '@/assets/components/FirstSection';

    import Section from '@/assets/components/ui/Section';

    export default {
        name: "App",

        components: {Section, FirstSection},

        data() {
            return {
                translations: {}
            };
        },

        beforeMount() {

            axios.get(`http://127.0.0.1:8000/get-translations?lang=${window.lang}`)
                .then((response) => {

                    this.translations = response.data;

                });

        }
    };
</script>

<style lang="sass">
    @import './sass/main.scss'
</style>
