export default defineNuxtConfig({
  modules: ['../src/module'],
  localForage: {
    name: 'nuxt-localforage-demo',
    storeName: 'demos',
  },
})
