<template>
  <div class="navbar-collapse collapse" id="nav_collapse" :class="{'show': menuOpened}">
    <ul class="navbar-nav d-md-inline-flex mt-3 mt-md-0">
      <li class="nav-item nav__item header__nav-item nav__item header__nav-item"
          :class="{'nav__item_active': activeItemIndex === 0}"
          @click.prevent="itemClicked($event, 0)">
        <a class="nav-link" href="#about" target="_self">{{ $root.__t('О нас') }}</a>
      </li>
      <li class="nav-item nav__item header__nav-item nav__item header__nav-item"
          :class="{'nav__item_active': activeItemIndex === 1}"
          @click.prevent="itemClicked($event, 1)">
        <a class="nav-link" href="#photo" target="_self">{{ $root.__t('Фотогалерея') }}</a>
      </li>
      <li class="nav-item nav__item header__nav-item nav__item header__nav-item"
          :class="{'nav__item_active': activeItemIndex === 2}"
          @click.prevent="itemClicked($event, 2)">
        <a class="nav-link" href="#portfolio" target="_self">{{ $root.__t('Что делаем') }}</a>
      </li>
      <li class="nav-item nav__item header__nav-item nav__item header__nav-item"
          :class="{'nav__item_active': activeItemIndex === 3}"
          @click.prevent="itemClicked($event, 3)">
        <a class="nav-link" href="#contacts" target="_self">{{ $root.__t('Контакты') }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      activeItemIndex: 0,
    };
  },
  props: {
    menuOpened: {
      type: Boolean,
      default: false,
    },
    activeIndex: {
      type: Number,
      default: 0,
    }
  },
  mounted() {
    this.activeItemIndex = this.activeIndex;
  },
  methods: {
    itemClicked(event, index) {
      this.activeItemIndex = index;
      this.$emit('nav-item:clicked', event, index);
    },
  },
}
</script>

<style scoped>

</style>
