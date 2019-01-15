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
            photoGallery: [
                'images/photo/1-1280.jpg?v=' + appVersion,
                'images/photo/11-1280.jpg?v=' + appVersion,
                'images/photo/2-1280.jpg?v=' + appVersion,
                'images/photo/3-1280.jpg?v=' + appVersion,
                'images/photo/4-1280.jpg?v=' + appVersion,
                'images/photo/5-1280.jpg?v=' + appVersion,
                'images/photo/6-1280.jpg?v=' + appVersion,
                'images/photo/7-1280.jpg?v=' + appVersion,
                'images/photo/8-1280.jpg?v=' + appVersion,
                'images/photo/9-1280.jpg?v=' + appVersion,
                'images/photo/10-1280.jpg?v=' + appVersion,
            ],
            workGallery: [

            ],
            mainImageIndex: null,
            galleryIndex: null
        };
    },

    mounted() {
        this.year = (new Date()).getFullYear();

        const $vm = this;

        document.addEventListener("DOMContentLoaded", function() {
            setTimeout($vm.loadImages, 500);
        });
    },

    methods: {
        loadImages () {
            const $vm = this;

            document.querySelectorAll('[data-image-src]').forEach(function (el) {
                var image = document.createElement('img'),
                    srcSet = '',
                    imageSizes = '';

                const dimensions = el.dataset.dimensions ? JSON.parse($vm.htmlDecode(el.dataset.dimensions)) : {};

                image.src = el.dataset.imageSrc + '?v=' + appVersion;
                image.alt = el.dataset.imageAlt;

                for (var width in dimensions) {
                    srcSet += (srcSet.length ? ', ' : '') + el.dataset.imageSrc.replace(/\.(.+)$/, '-' +
                        dimensions[width] + '.$1') + ' ' + width + 'w';
                    imageSizes += (imageSizes.length ? ', ' : '') + '(max-width: ' + width  + 'px)' + ' ' +
                        dimensions[width] + 'px';
                }

                image.srcset = srcSet;
                image.sizes = imageSizes;
                image.className = el.dataset.class && el.dataset.class.length ? el.dataset.class : '';

                el.appendChild(image);
            });
        },

        htmlDecode (str) {
            return str.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', "\"");
        }
    },

    components: { VueGallery, carousel, MainNav, ContactForm, Socials }
});