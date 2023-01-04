<template>
  <header class="header">
    <div class="container d-flex justify-content-between align-items-center header__wrapper">
      <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block"
         @click="itemClicked(0)" :title="$root.__t('Мастерская Былых Дел Монастырь')">
        KLOSTER
      </a>

      <b-navbar toggleable="md" class="nav header__nav">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#"></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav pills class="d-md-inline-flex">
            <b-nav-item href="#about" :class="navItemClass(0)"
                        @click="itemClicked(0)">{{ $root.__t('О нас') }}
            </b-nav-item>
            <b-nav-item href="#photo" :class="navItemClass(1)"
                        @click="itemClicked(1)">{{ $root.__t('Фотогалерея') }}
            </b-nav-item>
            <b-nav-item href="#portfolio" :class="navItemClass(2)"
                        @click="itemClicked(2)">{{ $root.__t('Что делаем') }}
            </b-nav-item>
            <b-nav-item href="#contacts" :class="navItemClass(3)"
                        @click="itemClicked(3)">{{ $root.__t('Контакты') }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <div class="header__socials">
        <socials />
        <lang />
      </div>
    </div>
  </header>
</template>

<script>
import Socials from "./Socials.vue";
import Lang from "./Lang.vue";

export default {
  name: "Header",
  data() {
    return {
      activeItemIndex: 0,
    };
  },
  components: {
    Socials,
    Lang,
  },
  methods: {
    itemClicked(index) {
      this.activeItemIndex = index;
      this.$emit('nav-item:clicked', index);
    },
    navItemClass(itemIndex) {
      return {
        'nav__item header__nav-item': true,
        'nav__item_active': itemIndex === this.activeItemIndex,
      };
    }
  },
}
</script>

<style scoped>

</style>
