import { createApp } from 'vue';

import router from './router.js';
import vuetify from './plugins/vuetify.js';
import { loadFonts } from './plugins/webfontloader.js';

import store from './store/index.js';
import App from './App.vue';

loadFonts();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');
