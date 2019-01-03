window.Vue = require('vue/dist/vue');
window.BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue');

import VueGallery from 'vue-gallery';
import carousel from 'vue-owl-carousel';

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
            galleryIndex: null,
            workIndex: null,
        };
    },

    mounted() {
        const nowDate = new Date();
        this.year = nowDate.getFullYear();

        const $vm = this;

        window.onscroll = function () {
            const header = document.querySelector('.header');
            if (document.documentElement.scrollTop >= 100 && !hasElemClass(header, 'header_sticky')) {
                header.className += ' header_sticky';
            } else if (document.documentElement.scrollTop < 100) {
                header.className = header.className.replace(/\s*header_sticky/g, '');
            }
        };
    },

    updated () {
        this.bodyPaddingTop = document.querySelector('.header').offsetHeight + 'px';
    },

    methods: {
        scrollWindow (event, index, fromNav) {
            event.preventDefault();

            const id = event.target.hash;
            const headerHeight = document.querySelector('.header').offsetHeight;
            const top = document.querySelector(id).offsetTop + (window.width >= 768 ? -headerHeight : 0);

            this.setNavItemActive(event.target, fromNav);

            window.scrollTo({
                top: index > 0 ? top : index,
                behavior: 'smooth'
            });
        },

        setNavItemActive (navItem, fromNav) {
            if (fromNav) {
                document.querySelectorAll('.nav-link_active').forEach(function (elem) {
                    deleteClassName(elem, 'nav-link_active');
                });

                navItem.className += ' nav-link_active';
            }
        }
    },

    components: { VueGallery, carousel }
});