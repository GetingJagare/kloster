<template>
  <navbar ref="navbar"/>
  <bottom />
</template>

<script>
import Navbar from "@js/components/Navbar.vue";
import Bottom from "@js/components/Bottom.vue";
import VueGallery from 'vue-gallery';
import carousel from 'vue-owl-carousel';
import ContactForm from './components/ContactForm.vue';

export default {
  name: "App",
  data() {
    return {
      bodyPaddingTop: 0,
      mainImageList: ['images/main.jpg'],
      photoGallery: [
        "/images/photo/1-1280.jpg",
        "/images/photo/11-1280.jpg",
        "/images/photo/2-1280.jpg",
        "/images/photo/3-1280.jpg",
        "/images/photo/4-1280.jpg",
        "/images/photo/5-1280.jpg",
        "/images/photo/6-1280.jpg",
        "/images/photo/7-1280.jpg",
        "/images/photo/8-1280.jpg",
        "/images/photo/9-1280.jpg",
        "/images/photo/10-1280.jpg"
      ],
      photoGalleryIndex: null,
      workGalleryAllImages: [
        "[&quot;/images/portfolio/1-768.jpg&quot;,&quot;/images/portfolio/12-768.jpg&quot;]",
        "[&quot;/images/portfolio/3-768.jpg&quot;,&quot;/images/portfolio/4-768.jpg&quot;,&quot;/images/portfolio/6-768.jpg&quot;]",
        "[&quot;/images/portfolio/2-768.jpg&quot;]",
        "[&quot;/images/portfolio/7-768.jpg&quot;]",
        "[&quot;/images/portfolio/8-768.jpg&quot;]",
        "[&quot;/images/portfolio/9-768.jpg&quot;]",
        "[&quot;/images/portfolio/10-768.jpg&quot;,&quot;/images/portfolio/11-768.jpg&quot;]"
      ],
      workGallery: [],
      workGalleryIndex: null,
      scrollTop: 0,
      scrollTopMax: 100,
      translations: {},
      defaultLang: '',
      lang: '',
    };
  },

  mounted() {
    this.bodyPaddingTop = this.$refs.navbar.offsetHeight;
    this.translations = JSON.parse(decodeURIComponent(window.translations));
    this.defaultLang = window.defaultLang;
    this.lang = window.lang;

    //this.setNavItemActive(document.querySelector('.header__nav').querySelector('[href="#about"]'));
    window.onscroll = () => {
      this.checkWindowScrollTop();
      this.checkInWhatSection();
    };
    //setTimeout(this.loadImages, 500);
  },

  updated () {
    this.checkWindowScrollTop();
  },

  methods: {
    __t(str) {
      return this.translations[str] || str;
    },

    loadImages(container) {

      container = container || document;

      const imageContainers = container.querySelectorAll('[data-image-src]');

      for (var i = 0; i < imageContainers.length; i++) {
        var el = imageContainers[i];

        if (el.dataset.notImageLoading) {
          return;
        }

        var image = document.createElement('img'),
            srcSet = '',
            imageSizes = '';

        const dimensions = el.dataset.dimensions ? JSON.parse(this.htmlDecode(el.dataset.dimensions)) : {};

        image.src = el.dataset.imageSrc;
        image.alt = el.dataset.imageAlt;

        for (var width in dimensions) {
          srcSet += (srcSet.length ? ', ' : '') + el.dataset.imageSrc + ' ' + width + 'w';
          imageSizes += (imageSizes.length ? ', ' : '') + '(max-width: ' + width + 'px)' + ' ' +
              dimensions[width] + 'px';
        }

        image.srcset = srcSet;
        image.sizes = imageSizes;
        image.loading = 'lazy';
        image.className = el.dataset.class && el.dataset.class.length ? el.dataset.class : '';

        el.appendChild(image);
      }
    },

    htmlDecode(str) {
      return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    },

    showWorkGallery(event) {
      const carouselItem = event.target.closest('.carousel__item'),
          index = Array.prototype.indexOf.call(carouselItem.closest('.carousel').querySelectorAll('.carousel__item'), carouselItem);

      this.workGallery = JSON.parse(this.htmlDecode(this.workGalleryAllImages[index]));

      function showGallery() {
        const gallery = document.querySelector('.gallery_hidden');
        if (gallery) {
          gallery.querySelectorAll('.gallery__image')[0].click();
        } else {
          setTimeout(showGallery, 100);
        }
      }

      setTimeout(showGallery, 100);
    },

    checkWindowScrollTop () {
      const header = document.querySelector('.header');

      if (document.documentElement.scrollTop >= this.scrollTopMax && !header.classList.contains('header_sticky')) {
        header.className += ' header_sticky';
      } else if (document.documentElement.scrollTop < this.scrollTopMax) {
        header.className = header.className.replace(/\s*header_sticky/g, '');
      }
    },

    scrollWindow (event, index) {
      event.preventDefault();
      this.scrollTop = document.querySelector(event.target.hash).offsetTop + (window.width >= 768 ? -this.$root.bodyPaddingTop : 0);

      window.scrollTo({
        top: index > 0 ? this.scrollTop : index,
        behavior: 'smooth'
      });
    },

    setNavItemActive (navItem) {
      const activeItems = document.querySelectorAll('.nav-link_active');

      for (let i = 0; i < activeItems.length; i++) {
        activeItems[i].classList.remove('nav-link_active');
      }

      navItem.className += ' nav-link_active';
    },

    checkInWhatSection () {

      const sections = document.querySelectorAll('.section');

      for (let i = 0; i < sections.length; i++) {
        let section = sections[i];

        const scrollTop = document.documentElement.scrollTop,
            minScrollTop = i > 0 ? section.offsetTop : 0;

        if (scrollTop >= minScrollTop && scrollTop < section.offsetTop + section.offsetHeight) {
          this.setNavItemActive(document.querySelector('.header__nav').querySelector(`[href="#${section.id}"]`));
        }
      }
    }

  },
  components: {
    Navbar,
    Bottom,
    VueGallery,
    carousel,
    ContactForm,
  },
}
</script>

<style scoped>

</style>
