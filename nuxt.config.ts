import { Context } from "@nuxt/types"

const environment = process.env.NODE_ENV || 'development'

// 元々定義されていたenvセットを取得する
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envSet = require(`./env/env.${environment}.js`)

const frontSideUrl = envSet.FRONT_SIDE_URL || 'http://localhost:3000/'
const serverSideUrl = envSet.SERVER_SIDE_URL || 'http://localhost:8080'
const rootDir = envSet.BASE_DIR || '/'
const version = envSet.VERSION || '[Not Set Version]'

/**
 * 公式ページから必要な要素を適宜追加する
 * https://nuxtjs.org/ja/docs/directory-structure/nuxt-config/
 */
export default {
  mode: 'spa',

  env: {
    frontSideUrl,
    serverSideUrl,
    rootDir,
    version
  },

  router: {
    base: rootDir,
    middleware:['dashboard']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - data-viewer',
    title: 'dk-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        // dark: {
        //   primary: colors.blue.darken2,
        //   accent: colors.grey.darken3,
        //   secondary: colors.amber.darken3,
        //   info: colors.teal.lighten1,
        //   warning: colors.amber.base,
        //   error: colors.deepOrange.accent4,
        //   success: colors.green.accent3
        // }
      }
    }
  },

  // https://typescript.nuxtjs.org/ja/guide/lint#%E3%83%A9%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%A0-lint
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config: any, ctx: Context): void {
      if (ctx.isDev) {
        config.devtool = 'inline-cheap-module-source-map'
      }
      // Run EXLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)|(\.svg$)/  
        })
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
