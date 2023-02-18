// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    // "~~": "/<rootDir>",
    // "@@": "/<rootDir>",
    "~": "/",
    "@": "/",
    "assets": "/",
    "public": "/public"
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'My App1',
      meta: [
        { name: 'description', content: 'My amazing site.' }
      ],
      // link: [
      //   {
      //     rel: 'stylesheet',
      //     href: 'https://fastly.jsdelivr.net/npm/vant@4/lib/index.css',
      //   }
      // ],
      bodyAttrs: {
        class: 'page-root-body'
      }
    }
  },
  css: [
    // 'element-plus/dist/index.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "assets/index.scss" as *;'
        }
      }
    }
  },
  modules: [
    '@element-plus/nuxt'
  ],
  plugins: [
    // '@/plugins/element-plus'
  ],
})
