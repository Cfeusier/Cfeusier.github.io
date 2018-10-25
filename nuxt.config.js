import * as pkg from './package';

module.exports = {
  mode: 'universal',

  head: {
    title: 'Clark Feusier | Software and Metalogic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Progress-bar color
  */
  loading: {
    color: '#f8bbd0',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/base.css', '~/assets/typography.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/contentful_client.js',
      ssr: false
    }
  ],

  env: {
    contentfulToken: process.env.CF_CONTENTFUL_TOKEN,
    contentfulSpace: process.env.CF_CONTENTFUL_SPACE_ID
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    materialIcons: false,
    options: {
      customProperties: true, // generate variables from theme colors
    },
    theme: {
      primary: {
        base: '#546e7a',
        darken1: '#29434e',
        lighten1: '#819ca9'
      },
      secondary: {
        base: '#f8bbd0',
        darken1: '#c48b9f',
        lighten1: '#ffeeff'
      },
      // accent: '',
      // error: '',
      // info: '',
      // success: '',
      // warning: ''
    }
  },

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

  build: {
    /*
    ** extend webpack config here
    */
    extend(config, ctx) {},
  }
}
