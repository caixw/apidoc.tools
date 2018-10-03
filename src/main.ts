// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
