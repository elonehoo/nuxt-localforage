export default defineNuxtConfig({
  modules: ['../src/module'],
  localForage: {
    name: 'nuxt-icones',
    storeName: 'icones',
  },
})
