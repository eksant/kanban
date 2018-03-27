import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Notifications from 'vue-notification'

(function (d, s, id) {
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

// var ApiFB = ''
// var LOCAL_DOMAINS = ['localhost', '127.0.0.1']
// if (LOCAL_DOMAINS.includes(window.location.hostname)) {
//   ApiFB = '213092439268283'
// } else {
//   APIFB = '389643448127142'
// }

window.fbAsyncInit = function () {
  window.FB.init({
    appId: '1957305027918980',
    cookie: true,
    xfbml: true,
    version: 'v2.12'
  })
  Vue.FB = window.FB
}

Vue.config.productionTip = false
Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
