
module.exports = {

  generate: {
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        })
      ]).then(([ posts ]) => {
        return [
          ...posts.items.map(post => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          })
        ]
      })
    }
  },
  
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vue-scrollto',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  // buildModules: [
  //   // Doc: https://github.com/nuxt-community/eslint-module
  //   '@nuxtjs/eslint-module'
  // ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-###########'
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  telemetry: false
}
