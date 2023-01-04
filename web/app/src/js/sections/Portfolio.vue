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
        <div class="carousel__item" v-for="(item, index) in workGalleryAllImages"
             :title="$root.__t(item.title)" @click.stop="workGalleryIndex = index">
          <img :src="item.main" alt="" :srcset="srcSet(item)" :sizes="sizes(item)"/>
          <div class="carousel__item-caption">
            <span v-html="`${item.caption.map((str) => $root.__t(str)).join(' ')}`"></span>
          </div>
        </div>

        <template #prev>
          <span class="fa fa-angle-left carousel__nav-btn carousel__nav-btn_prev"></span>
        </template>
        <template #next>
          <span class="fa fa-angle-right carousel__nav-btn carousel__nav-btn_next"></span>
        </template>
      </carousel>
      <vue-gallery :images="gallery" :index="workGalleryIndex" @close="workGalleryIndex = null"
                   :options="{container: '#work-gallery'}" id="work-gallery"></vue-gallery>
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
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Скандинавская игра "Дальдоза"',
          ],
        },
        {
          main: "/images/portfolio/3-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/3-768.jpg', '/images/portfolio/4-768.jpg', '/images/portfolio/6-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Обложка для паспорта. Сделана из натуральной кожи.',
            'Пирография.'
          ],
        },
        {
          main: "/images/portfolio/2-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/2-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Скандинавская игра "Хнефатафл".',
            'Материалы - кожа, дубовый желудь, каштан. Пирография.'
          ],
        },
        {
          main: "/images/portfolio/7-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/7-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Магниты на холодильник. Пирография'
          ],
        },
        {
          main: "/images/portfolio/8-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/8-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Ташка из кожи на Скандинавию.',
            'Литье - латунь.'
          ],
        },
        {
          main: "/images/portfolio/9-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/9-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Ботинки из натуральной кожи на Скандинавию, 9 - 11 вв.',
            'Пропитаны воско-жировым составом.'
          ],
        },
        {
          main: "/images/portfolio/10-1024.jpg",
          dimensions: {"768": 768, "1024": 1024},
          gallery: ['/images/portfolio/10-768.jpg', '/images/portfolio/11-768.jpg'],
          title: 'Кликните, чтобы посмотреть все фотографии',
          caption: [
            'Нож кованый, сталь 65-Г. Рукоять - бук.',
            'Пропитка рукояти льняным маслом.'
          ],
        },
      ],
      workGallery: [],
      workGalleryIndex: null,
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
    gallery() {
      return this.workGalleryIndex !== null ? this.workGalleryAllImages[this.workGalleryIndex].gallery : [];
    }
  }
}
</script>

<style>

</style>
