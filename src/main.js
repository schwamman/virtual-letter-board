import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faSave, faEraser, faShareSquare, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';

library.add(faTrashAlt, faSave, faEraser, faShareSquare, faCopy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// new Vue({
//   vuetify,
//   router,
//   components: { App },
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  vuetify,
  components: {
    App
  }
})
