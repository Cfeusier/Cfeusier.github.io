import * as pkg from './package';
import cheerio from 'cheerio';

module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'cheerio'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  //generate: {
  //  fallback: 'index.html'
  // },

  router: {
    scrollBehavior () {
      return { x: 0, y: 0 };
    },
    extendRoutes (routes, resolve) {
      routes.push({
        name: '404 Error Page',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  /*
   ** remove the buggy preload/prefetch logic and strip html of nuxt files
   ** as we are generating a static site that doesn't need nuxt after build
  */
  render: { resourceHints: false },
  hooks: {
    'generate:page': page => {
      const doc = cheerio.load(page.html);
      doc(`body script`).remove();
      page.html = doc.html();
    },
  },

  build: {
    /*
    ** extend webpack config here
    */
    extend(config, ctx) {}
  }
}
