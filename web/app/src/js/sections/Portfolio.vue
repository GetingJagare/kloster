<template>
  <common-section section-class="section" id="portfolio">
    <template #title>
      <h3 class="title title_smaller text-center">
        {{ $root.__t('Небольшая подборка фото с работами') }}
      </h3>
    </template>
    <template #content>
      <carousel :autoHeight="true" :dots="false" :margin="10" class="carousel carousel_works" :nav="false"
                :responsive="{0:{items:1, margin: 0},640:{items:2}, 768:{items:3}}">
        <div class="carousel__item" @click.stop="showWorkGallery($event, i)" v-for="(item, i) in workGalleryAllImages" :title="item.title">
          <img :src="item.main" alt="" :srcset="srcSet(item)" :sizes="sizes(item)"/>
          <div class="carousel__item-caption">
            <span>{{ item.caption }}</span>
          </div>
        </div>

        <template #prev>
          <span class="fa fa-angle-left carousel__nav-btn carousel__nav-btn_prev"></span>
        </template>
        <template #next>
          <span class="fa fa-angle-right carousel__nav-btn carousel__nav-btn_next"></span>
        </template>
      </carousel>

      <div class="gallery gallery_hidden" v-if="workGallery.length">
        <img class="gallery__image" v-for="(workImage, imageIndex) in workGallery"
             @click="workGalleryIndex = imageIndex" :src="workImage" alt=""/>
      </div>
      <vue-gallery :images="workGallery" :index="workGalleryIndex" :options="{container: '#work-gallery'}"
                   id="work-gallery" @close="workGalleryIndex = null"></vue-gallery>
    </template>
  </common-section>
</template>

<script>
import CommonSection from "@js/ui/Section.vue";
import VueGallery from 'vue-gallery';
import Carousel from 'vue-owl-carousel';
import {srcSet, sizes} from "../helper/image.js";

export default {
  name: "Portfolio",
  data() {
    return {
      workGalleryAllImages: [
        {
          main: "/images/portfolio/1-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/1-768.jpg', '/images/portfolio/12-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: this.$root.__t('Скандинавская игра "Дальдоза"'),
        },
        {
          main: "/images/portfolio/3-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/3-768.jpg', '/images/portfolio/4-768.jpg', '/images/portfolio/6-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: `${this.$root.__t('Обложка для паспорта. Сделана из натуральной кожи.')}<br>${this.$root.__t('Пирография.')}`,
        },
        {
          main: "/images/portfolio/2-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/2-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: `${this.$root.__t('Скандинавская игра "Хнефатафл".')}<br>` +
              `${this.$root.__t('Материалы - кожа, дубовый желудь, каштан. Пирография.')}`,
        },
        {
          main: "/images/portfolio/7-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/7-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: this.$root.__t('Магниты на холодильник. Пирография'),
        },
        {
          main: "/images/portfolio/8-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/8-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: `${this.$root.__t('Ташка из кожи на Скандинавию.')}<br>${this.$root.__t('Литье - латунь.')}`,
        },
        {
          main: "/images/portfolio/9-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/9-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: `${this.$root.__t('Ботинки из натуральной кожи на Скандинавию, 9 - 11 вв.')}<br>` +
              `${this.$root.__t('Пропитаны воско-жировым составом.')}`,
        },
        {
          main: "/images/portfolio/10-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/10-768.jpg', '/images/portfolio/11-768.jpg'],
          title: this.$root.__t('Кликните, чтобы посмотреть все фотографии'),
          caption: `${this.$root.__t('Нож кованый, сталь 65-Г. Рукоять - бук.')}<br>${this.$root.__t('Пропитка рукояти льняным маслом.')}`,
        },
      ],
      workGallery: [],
      workGalleryIndex: null,
    }
  },
  methods: {
    showWorkGallery(event, index) {
      this.workGallery = this.workGalleryAllImages[index].gallery;
      setTimeout(this.showGallery, 100);
    },
    showGallery() {
      const gallery = this.$el.querySelector('.gallery_hidden');
      if (gallery) {
        gallery.querySelector('.gallery__image').click();
      } else {
        setTimeout(this.showGallery, 100);
      }
    },
    srcSet,
    sizes,
  },
  components: {
    CommonSection,
    VueGallery,
    Carousel,
  }
}
</script>

<style>

</style>
