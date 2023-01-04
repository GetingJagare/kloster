import {BootstrapVue} from 'bootstrap-vue';
import {createApp} from 'vue';
import App from './App.vue';

import "@scss/app.scss";

const app = createApp(App);
app.use(BootstrapVue).mount('#app');
