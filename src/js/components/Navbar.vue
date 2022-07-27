<template>
  <header class="header">
    <div class="container d-flex justify-content-between align-items-center header__wrapper">
      <div class="container d-flex justify-content-between align-items-center header__wrapper">
        <a href="#about" class="header__logo text text_futhark d-none d-md-inline-block"
           @click="scrollWindow($event, 0)"
           :title="$parent.__t('Мастерская Былых Дел Монастырь')">
          KLOSTER
        </a>

        <nav class="nav header__nav">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </nav>

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
