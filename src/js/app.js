window.Vue = process.env.NODE_ENV === 'production' ? require('vue/dist/vue.min.js') : require('vue/dist/vue.js');
window.BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue');
window.axios = require('axios');

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
                'images/photo/1.jpg',
                'images/photo/2.jpg',
                'images/photo/3.jpg',
                'images/photo/4.jpg',
                'images/photo/5.jpg',
                'images/photo/6.jpg',
                'images/photo/7.jpg',
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
            document.querySelectorAll('[data-image-src').forEach(function (el) {
                var image = document.createElement('img');
                image.src = el.dataset.imageSrc;
                image.alt = el.dataset.imageAlt;
                el.appendChild(image);
            });
        }
    },

    components: { VueGallery, carousel, MainNav, ContactForm, Socials }
});