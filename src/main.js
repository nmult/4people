import Vue from 'vue';
import store from './store';
import vuetify from './plugins/vuetify';
import App from './App.vue';

Vue.config.productionTip = false;


new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
