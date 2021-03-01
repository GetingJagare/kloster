import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import axios from 'axios';
import vuetify from './plugins/vuetify';

window.axios = axios;

new Vue({
    methods: {
        t: require('@/helpers/t')
    },

    vuetify,
    render: h => h(App)
}).$mount('#app');
