// 1. 引入你需要的组件
import vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(vant)
})
