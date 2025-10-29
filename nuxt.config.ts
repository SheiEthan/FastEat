// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'FastEat',
      short_name: 'FastEat',
      description: 'Commandez vos plats préférés en ligne avec FastEat.',
      theme_color: '#27ae60',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      lang: 'fr',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: true,
    },
  },

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