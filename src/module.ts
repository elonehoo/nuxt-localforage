import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import localforage from 'localforage'
import { name, version } from '../package.json'
import type { LocalForageOptions } from './runtime/types'
import { defineRuntimeConfig } from './runtime/utils'

export const INDEXEDDB = localforage.INDEXEDDB
export const LOCALSTORAGE = localforage.LOCALSTORAGE
export const WEBSQL = localforage.WEBSQL

export * from './runtime/types'

interface ModuleOptions extends LocalForageOptions {
  instances?: LocalForageOptions[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'localForage',
    compatibility: {
      bridge: true,
    },
  },
  defaults: {
    name: 'nuxt3',
    storeName: 'nuxt3LocalForage',
  },
  setup(options, nuxt) {
    // Default runtimeConfig
    defineRuntimeConfig(nuxt, options)

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    addPlugin({
      src: resolve(runtimeDir, 'plugin'),
      mode: 'client',
    })

    addImports({
      name: 'useLocalForage',
      as: 'useLocalForage',
      from: resolve(runtimeDir, 'composables'),
    })
  },
})
declare module '@nuxt/schema' {
}
