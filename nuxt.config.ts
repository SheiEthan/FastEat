// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    strategy: 'no_prefix',
    langDir: 'locales/',
  },

  app: {
    head: {
      title: 'FastEat',
      meta: [
        { name: 'description', content: 'FastEat - Commandez vos plats préférés en ligne.' },
        { property: 'og:title', content: 'FastEat' },
        { property: 'og:description', content: 'FastEat - Commandez vos plats préférés en ligne.' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
});