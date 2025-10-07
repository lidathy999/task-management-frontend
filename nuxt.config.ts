import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api'
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
      vuetify({
        autoImport: true,
      }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: [
    '@pinia/nuxt',
  ],

})
