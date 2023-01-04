<template>
  <header class="header" :class="navbarClass">
    <div class="container d-flex justify-content-between align-items-start align-items-md-center header__wrapper">
      <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block"
         @click.prevent="itemClicked($event, 0)" :title="$root.__t('Мастерская Былых Дел Монастырь')">
        KLOSTER
      </a>

      <nav class="navbar navbar-light navbar-expand-md nav header__nav">
        <button class="navbar-toggler collapsed" type="button" @click="menuToggled = !menuToggled">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#" target="_self"></a>
        <div class="navbar-collapse collapse" id="nav_collapse" :class="{'show': menuToggled}">
          <ul class="navbar-nav d-md-inline-flex">
            <li class="nav-item nav__item header__nav-item" :class="navItemClass(0)"
                @click.prevent="itemClicked($event, 0)">
              <a class="nav-link" href="#about" target="_self">{{ $root.__t('О нас') }}</a>
            </li>
            <li class="nav-item nav__item header__nav-item" :class="navItemClass(1)"
                @click.prevent="itemClicked($event, 1)">
              <a class="nav-link" href="#photo" target="_self">{{ $root.__t('Фотогалерея') }}</a>
            </li>
            <li class="nav-item nav__item header__nav-item" :class="navItemClass(2)"
                @click.prevent="itemClicked($event, 2)">
              <a class="nav-link" href="#portfolio" target="_self">{{ $root.__t('Что делаем') }}</a>
            </li>
            <li class="nav-item nav__item header__nav-item" :class="navItemClass(3)"
                @click.prevent="itemClicked($event, 3)">
              <a class="nav-link" href="#contacts" target="_self">{{ $root.__t('Контакты') }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="header__socials d-flex d-md-block align-items-center">
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
      sticky: false,
      menuToggled: false,
    };
  },
  components: {
    Socials,
    Lang,
  },
  methods: {
    itemClicked(event, index) {
      this.activeItemIndex = index;
      this.$emit('nav-item:clicked', event, index);
    },
    navItemClass(itemIndex) {
      return {
        'nav__item header__nav-item': true,
        'nav__item_active': itemIndex === this.activeItemIndex,
      };
    }
  },
  computed: {
    navbarClass() {
      return {
        'header_sticky': this.sticky,
      }
    }
  }
}
</script>

<style>

</style>
