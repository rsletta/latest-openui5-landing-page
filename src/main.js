import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ui5-/];

const config = {
  apiKey: "AIzaSyADelwnX6NDcpLZZENKA3DpqZL2liDK1aE",
  databaseURL: "https://get-latest-openui5-version.firebaseio.com",
  projectId: "get-latest-openui5-version"
};

firebase.initializeApp(config);

new Vue({
  render: h => h(App),
}).$mount('#app')