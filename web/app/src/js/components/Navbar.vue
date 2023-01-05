<template>
  <header class="header" :class="navbarClass">
    <div class="container d-flex justify-content-between align-items-start align-items-md-center header__wrapper">
      <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block"
         @click.prevent="itemClicked($event, 0)" :title="$root.__t('Мастерская Былых Дел Монастырь')">
        KLOSTER
      </a>

      <nav class="navbar navbar-light navbar-expand-md nav header__nav">
        <button class="navbar-toggler" type="button" @click="menuOpened = !menuOpened"
                :class="{'collapsed': menuOpened}">
          <span class="navbar-toggler-icon d-flex flex-column justify-content-between">
            <span class="navbar-toggler-icon-line" :class="{'collapsed': menuOpened}"></span>
            <span class="navbar-toggler-icon-line" :class="{'collapsed': menuOpened}"></span>
            <span class="navbar-toggler-icon-line" :class="{'collapsed': menuOpened}"></span>
          </span>
        </button>
        <Transition>
          <navigation ref="nav" @nav-item:clicked="itemClicked" :active-index="activeItemIndex"
                      :menu-opened="$root.isMobile && menuOpened" v-if="$root.isMobile && menuOpened" />
        </Transition>
        <navigation ref="nav" @nav-item:clicked="itemClicked" :active-index="activeItemIndex"
                    :menu-opened="!$root.isMobile" v-if="!$root.isMobile" />
      </nav>

      <div class="header__socials d-flex align-items-center">
        <socials />
        <lang />
      </div>
    </div>
  </header>
</template>

<script>
import Socials from "./Socials.vue";
import Lang from "./Lang.vue";
import Navigation from "./Nav.vue";

export default {
  name: "Header",
  data() {
    return {
      activeItemIndex: 0,
      sticky: false,
      menuOpened: false,
    };
  },
  components: {
    Socials,
    Lang,
    Navigation,
  },
  methods: {
    itemClicked(event, index) {
      this.activeItemIndex = index;
      this.$emit('nav-item:clicked', event, index);
    },
  },
  computed: {
    navbarClass() {
      return {
        'header_sticky': this.sticky,
      }
    }
  },
  watch: {
    activeItemIndex(newIndex) {
      if (this.$refs.nav) {
        this.$refs.nav.activeItemIndex = newIndex;
      }
    }
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
