<template>
  <header class="header">
    <div class="container d-flex justify-content-between align-items-center header__wrapper">
      <div class="container d-flex justify-content-between align-items-center header__wrapper">
        <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block"
           @click="scrollWindow($event, 0)"
           :title="$parent.__t('Мастерская Былых Дел Монастырь')">
          KLOSTER
        </a>

<!--        <b-navbar toggleable="md" class="nav header__nav">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#"></b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav pills class="d-md-inline-flex">
              <b-nav-item href="#about" active active-class="nav-link_active"
                          class="nav__item header__nav-item"
                          @click="scrollWindow($event, 0)"><%= htmlWebpackPlugin.options.t('О нас') %>
              </b-nav-item>
              <b-nav-item href="#photo" active-class="nav-link_active" class="nav__item header__nav-item"
                          @click="scrollWindow($event, 1)"><%= htmlWebpackPlugin.options.t('Фотогалерея')
                %>
              </b-nav-item>
              <b-nav-item href="#portfolio" active-class="nav-link_active"
                          class="nav__item header__nav-item"
                          @click="scrollWindow($event, 2)"><%= htmlWebpackPlugin.options.t('Что делаем')
                %>
              </b-nav-item>
              <b-nav-item href="#contacts" active-class="nav-link_active"
                          class="nav__item header__nav-item"
                          @click="scrollWindow($event, 3)"><%= htmlWebpackPlugin.options.t('Контакты') %>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>-->

        <div class="header__socials">

          <socials></socials>

          <div class="langs header__langs text-center">
            <a href="/" :title="$parent.__t('Русский')" class="langs__link header__langs-link"
              v-if="$parent.lang !== 'ru'">
              <span class="flag-icon flag-icon-ru langs__icon header__langs-icon"></span>
            </a>
            <a href="/en" :title="$parent.__t('Английский')" class="langs__link header__langs-link"
              v-if="$parent.lang !== 'en'">
              <span class="flag-icon flag-icon-gb-eng langs__icon header__langs-icon"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

import Socials from '@js/components/Socials.vue';

export default {
  name: "Navbar",
  components: {
    Socials,
  }
}
</script>

<style>

</style>
