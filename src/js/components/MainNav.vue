<template>
    <div class="container d-flex justify-content-between align-items-center header__wrapper">
        <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block" @click="scrollWindow($event, 0);"
            title="Мастерская былых дел Монастырь">
            KLOSTER
        </a>

        <b-navbar toggleable="md" class="nav header__nav">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#"></b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav pills class="d-md-inline-flex">
                    <b-nav-item href="#about" active active-class="nav-link_active" class="nav__item header__nav-item"
                                @click="scrollWindow($event, 0)">О нас
                    </b-nav-item>
                    <b-nav-item href="#photo" active-class="nav-link_active" class="nav__item header__nav-item"
                                @click="scrollWindow($event, 1)">Фотогалерея
                    </b-nav-item>
                    <b-nav-item href="#portfolio" active-class="nav-link_active" class="nav__item header__nav-item"
                                @click="scrollWindow($event, 2)">Что делаем
                    </b-nav-item>
                    <b-nav-item href="#contacts" active-class="nav-link_active" class="nav__item header__nav-item"
                                @click="scrollWindow($event, 3)">Контакты
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <socials></socials>
    </div>
</template>

<script>
    import Socials from './Socials.vue';

    export default {
        name: "MainNav",

        data () {
            return {
                scrollTop: 0,
                scrollTopMax: 100
            }
        },

        mounted () {
            var $vm = this;

            $vm.$root.bodyPaddingTop = document.querySelector('.header').offsetHeight;

            window.onscroll = function () {
                $vm.checkWindowScrollTop();
                $vm.checkInWhatSection();
            };
        },

        updated () {
            this.checkWindowScrollTop();
        },

        methods: {

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
                document.querySelectorAll('.nav-link_active').forEach(function (elem) {
                    deleteClassName(elem, 'nav-link_active');
                });

                navItem.className += ' nav-link_active';
            },

            checkInWhatSection () {
                const $vm = this;

                document.querySelectorAll('.section').forEach(function (section, index) {
                    const scrollTop = document.documentElement.scrollTop;
                    const minScrollTop = index > 0 ? section.offsetTop : 0;

                    if (scrollTop >= minScrollTop && scrollTop < section.offsetTop + section.offsetHeight) {
                        $vm.setNavItemActive(document.querySelector('.header__nav').querySelector('[href="#' + section.id + '"]'));
                    }
                });
            },

        },

        components: {Socials}
    }
</script>

<style scoped>

</style>