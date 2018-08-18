module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Damp Camp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/raindrop.png' }
    ]
  },

  css: [
    '~/assets/sass/main.scss'
  ],

  modules: [
    'nuxt-sass-resources-loader'
  ],

  sassResources: [
    '@/assets/sass/_variables.scss',
    '@/assets/sass/_colors.scss',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
