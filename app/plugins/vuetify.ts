import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg' 

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
     icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
         mdi: mdiSvg, 
      },
    },
  })
  app.vueApp.use(vuetify)
})
