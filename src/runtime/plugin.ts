import localforage from 'localforage'
import type { LocalForageInstance } from './types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { localForage: options } } = useRuntimeConfig()
  const localForageInstance = localforage.createInstance(options)

  if (options.instances) {
    for (const instance of options.instances) {
      const name = instance.storeName || instance.name

      if (!name)
        continue

      //@ts-ignore
      localForageInstance[name] = localforage.createInstance(instance)
    }
  }

  nuxtApp.provide('localForage', localForageInstance)
})

interface PluginInjection {
  $localForage: LocalForageInstance
}

// Nuxt Bridge & Nuxt 3
declare module '#app' {
  interface NuxtApp extends PluginInjection {
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {
  }
}

// @ts-expect-error
declare module 'vue/types/vue' {
  interface Vue extends PluginInjection {
  }
}
