<template>
  <common-section section-class="section section_even gallery" id="photo">
    <template #title>
      <h2 class="title title_smaller text-center">
        {{ $root.__t('Несколько фотографий с мероприятий') }}
      </h2>
    </template>
    <template #content>
      <vue-gallery :images="images" :index="photoGalleryIndex" :options="{startSlideshow: true}"
                   @close="photoGalleryIndex = null"></vue-gallery>
      <carousel :autoHeight="true" :dots="false" :margin="10"
                class="carousel carousel_photo"
                :nav="false" :mouseDrag="false" :touchDrag="false"
                :responsive="{0:{items:1, margin: 0}, 768:{items:2}}">
        <div class="carousel__item" v-for="(photo, index) in photoGallery">
          <div @click="photoGalleryIndex = index" :key="`photo_${index}`">
            <img :src="photo.main" alt="" :srcset="srcSet(photo)" :sizes="sizes(photo)" class="gallery__image" />
          </div>
          <div class="carousel__item-caption">
            <span>{{ photo.caption }}</span>
          </div>
        </div>
        <template #prev>
          <span class="fa fa-angle-left carousel__nav-btn carousel__nav-btn_prev"></span>
        </template>
        <template #next>
          <span class="fa fa-angle-right carousel__nav-btn carousel__nav-btn_next"></span>
        </template>
      </carousel>
    </template>
  </common-section>
</template>

<script>
import CommonSection from "@js/ui/Section.vue";
import VueGallery from 'vue-gallery';
import Carousel from 'vue-owl-carousel';
import {srcSet, sizes} from "../helper/image.js";

export default {
  name: "Photos",
  data() {
    return {
      photoGallery: [
        {
          main: "/images/photo/1-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/11-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Монастырские маневры')}, 2017`,
        },
        {
          main: "/images/photo/2-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/3-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/4-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/5-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/6-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/7-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Воиново Поле')}, 2018`,
        },
        {
          main: "/images/photo/8-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Наследие предков')}, 2017`,
        },
        {
          main: "/images/photo/9-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Наследие предков')}, 2017`,
        },
        {
          main: "/images/photo/10-1280.jpg",
          dimensions: {"1024": 1024, "1280": 1280},
          caption: `${this.$root.__t('Наследие предков')}, 2017`,
        },
      ],
      photoGalleryIndex: null,
    }
  },
  methods: {
    srcSet,
    sizes,
  },
  components: {
    CommonSection,
    VueGallery,
    Carousel,
  },
  computed: {
    images() {
      return this.photoGallery.map((photo) => photo.main);
    }
  }
}
</script>

<style>

</style>
