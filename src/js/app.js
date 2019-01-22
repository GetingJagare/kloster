window.Vue = process.env.NODE_ENV === 'production' ? require('vue/dist/vue.min.js') : require('vue/dist/vue.js');
window.BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue');
window.axios = require('axios');
window.appVersion = require('../../package.json').version;

import VueGallery from 'vue-gallery';
import carousel from 'vue-owl-carousel';

import ContactForm from './components/ContactForm.vue';
import MainNav from './components/MainNav.vue';
import Socials from './components/Socials.vue';

Vue.use(BootstrapVue);

(function(e){
    e.closest = e.closest || function(css){
        var node = this;

        while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
        }
        return null;
    }
})(Element.prototype);

window.hasElemClass = function (elem, className) {
    return elem.className.indexOf(className) > -1;
};

window.deleteClassName = function (elem, className) {
    const regExp = new RegExp('\\s*' + className + '\\s*');
    elem.className = elem.className.replace(regExp, '');
};

var app = new Vue({
    el: '#app',
    data () {
        return {
            year: '',
            bodyPaddingTop: 0,
            mainImageList: ['images/main.jpg'],
            photoGallery: [],
            photoGalleryIndex: null,
            workGalleryAllImages: [],
            workGallery: [],
            workGalleryIndex: null
        };
    },

    mounted() {
        this.year = (new Date()).getFullYear();

        const $vm = this;

        window.$vm = $vm;

        document.addEventListener("DOMContentLoaded", function() {
            setTimeout($vm.loadImages, 500);
        });

        this.photoGallery = require('./src/photos').images;
        this.workGalleryAllImages = require('./src/works').images;
    },

    methods: {
        loadImages (container) {

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
                    imageSizes += (imageSizes.length ? ', ' : '') + '(max-width: ' + width  + 'px)' + ' ' +
                        dimensions[width] + 'px';
                }

                image.srcset = srcSet;
                image.sizes = imageSizes;
                image.className = el.dataset.class && el.dataset.class.length ? el.dataset.class : '';

                el.appendChild(image);
            }
        },

        htmlDecode (str) {
            return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
        },

        showWorkGallery (event) {
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
        }

    },

    components: { VueGallery, carousel, MainNav, ContactForm, Socials }
});