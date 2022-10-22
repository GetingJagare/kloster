import {BootstrapVue} from 'bootstrap-vue';
import Vue from 'vue';
import VueGallery from 'vue-gallery';
import carousel from 'vue-owl-carousel';

import ContactForm from './components/ContactForm.vue';
import Socials from './components/Socials.vue';

Vue.use(BootstrapVue);

(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {
            return null
        }
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));

window.hasElemClass = function (elem, className) {
    return elem.className.indexOf(className) > -1;
};

window.deleteClassName = function (elem, className) {
    const regExp = new RegExp('\\s*' + className + '\\s*');
    elem.className = elem.className.replace(regExp, '');
};

var app = new Vue({
    el: '#app',
    data() {
        return {
            year: '',
            bodyPaddingTop: 0,
            mainImageList: ['images/main.jpg'],
            photoGallery: [],
            photoGalleryIndex: null,
            workGalleryAllImages: [],
            workGallery: [],
            workGalleryIndex: null,
            scrollTop: 0,
            scrollTopMax: 100
        };
    },

    mounted() {
        this.year = (new Date()).getFullYear();

        const $vm = this;

        window.$vm = $vm;

        $vm.bodyPaddingTop = document.querySelector('.header').offsetHeight;

        this.setNavItemActive(document.querySelector('.header__nav').querySelector('[href="#about"]'));
        window.onscroll = function () {
            $vm.checkWindowScrollTop();
            $vm.checkInWhatSection();
        };

        document.addEventListener("DOMContentLoaded", function () {
            setTimeout($vm.loadImages, 500);
        });

        this.photoGallery = require('./src/photos').images;
        this.workGalleryAllImages = require('./src/works').images;
    },

    updated () {
        this.checkWindowScrollTop();
    },

    methods: {
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
                image.className = el.dataset.class && el.dataset.class.length ? el.dataset.class : '';

                el.appendChild(image);
            }
        },

        htmlDecode(str) {
            return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
        },

        showWorkGallery(event) {
            const carouselItem = event.target.closest('.carousel__item');

            const index = Array.prototype.indexOf.call(carouselItem.closest('.carousel').querySelectorAll('.carousel__item'), carouselItem);

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

            if (document.documentElement.scrollTop >= this.scrollTopMax && !hasElemClass(header, 'header_sticky')) {
                header.className += ' header_sticky';
            } else if (document.documentElement.scrollTop < this.scrollTopMax) {
                header.className = header.className.replace(/\s*header_sticky/g, '');
            }
        },

        scrollWindow (event, index) {
            event.preventDefault();

            const $vm = this;
            const id = event.target.hash;

            this.scrollTop = document.querySelector(id).offsetTop + (window.width >= 768 ? -$vm.$root.bodyPaddingTop : 0);

            window.scrollTo({
                top: index > 0 ? this.scrollTop : index,
                behavior: 'smooth'
            });
        },

        setNavItemActive (navItem) {
            const activeItems = document.querySelectorAll('.nav-link_active');

            for (var i = 0; i < activeItems.length; i++) {
                deleteClassName(activeItems[i], 'nav-link_active');
            }

            navItem.className += ' nav-link_active';
        },

        checkInWhatSection () {

            const sections = document.querySelectorAll('.section');

            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];

                const scrollTop = document.documentElement.scrollTop;
                const minScrollTop = i > 0 ? section.offsetTop : 0;

                if (scrollTop >= minScrollTop && scrollTop < section.offsetTop + section.offsetHeight) {
                    this.setNavItemActive(document.querySelector('.header__nav').querySelector(`[href="#${section.id}"]`));
                }
            }
        }

    },

    components: {VueGallery, carousel, ContactForm, Socials}
});
