import App from './App'
import { http} from 'util/api.js' 
Vue.prototype.$http = http //封装myRequest方法挂载到vue全局

// #ifndef VUE3
import Vue from 'vue'
/*引入uview*/
import uView from '@/uni_modules/uview-ui'
//将默认单位改为rpx
uni.$u.config.unit = 'rpx'
Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif