import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import axios from 'axios';

window.axios = axios;

new Vue({
    methods: {
        t: require('@/helpers/t')
    },
    render: h => h(App)
}).$mount('#app');
