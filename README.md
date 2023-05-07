# nuxt3-localforage

> [LocalForage](https://github.com/localForage/localForage) module for Nuxt 3 

> **Note**
> This module is compatible with [Nuxt 3](https://nuxt.com/). If you're looking for the Nuxt 2 version, check out [@nuxtjs/localforage](https://github.com/nuxt-community/localforage-module) [module](https://nuxt.com/modules).

## Install

```bash
#npm 
npm install --save-dev nuxt3-localforage

#yarn
yarn add --dev nuxt3-localforage

#pnpm
pnpm add --save-dev nuxt3-localforage
```

## Config

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    // Simple usage
    'nuxt3-localforage',
  ],
  vite: {
    optimizeDeps: {
      include: ['localforage'],
    },
  }
})
```

## Using top level options

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    // Simple usage
    'nuxt3-localforage',
  ],
  vite: {
    optimizeDeps: {
      include: ['localforage'],
    },
  }
  localForage: {
    /* module options */
  }
})
```

## Options

### driver (optional)

- Default: `[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]`

The preferred driver(s) to use. Same format as what is passed to `setStorageDriver()`, above.

### name (optional)

- Default: `'nuxt3'`

The name of the database. May appear during storage limit prompts. Useful to use the name of your app here. In
localStorage, this is used as a key prefix for all keys stored in localStorage.

### version (optional)

- Default: `1.0`

The version of your database. May be used for upgrades in the future; currently unused.

### size (optional)

- Default: `4980736`

The size of the database in bytes. Used only in WebSQL for now.

### storeName (optional)

- Default: `'nuxt3LocalForage'`

The name of the datastore. In IndexedDB this is the dataStore, in WebSQL this is the name of the key/value table in the
database. Must be alphanumeric, with underscores. Any non-alphanumeric characters will be converted to underscores.

### description (optional)

- Default: `''`

A description of the database, essentially for developer usage.

### `instances` (optional)

- Default: `[]`

You can create multiple instances.

[More informations on LocalForage documentation](https://github.com/localForage/localForage)

## Usage

- In Composition API, you can access the `LocalForage` instance by using `const localForage = useLocalForage()`
  or `const { $localForage } = useNuxtApp()`.

- In Options API, you can access the `LocalForage` instance by using `this.$localForage`.

### Get item

```ts
const localForage = useLocalForage()
const item = await localForage.getItem(key)
```

### Set item

```ts
const localForage = useLocalForage()
await localForage.setItem(key, value)
```

### Remove item

```ts
const localForage = useLocalForage()
await localForage.removeItem(key)
```

### Clear

```ts
const localForage = useLocalForage()
await localForage.clear
```

### Gets the length

```ts
const localForage = useLocalForage()
const length = await localForage.length
```

### Get the name of a key based on its ID

```ts
const localForage = useLocalForage()
const k = await localForage.key(keyIndex)
```

### Get the list of all keys

```ts
const localForage = useLocalForage()
const keys = await localForage.keys()
```

### Force usage of a particular driver or drivers, if available

```ts
const localForage = useLocalForage()
localForage.setDriver(localforage.LOCALSTORAGE)
```

By default, localForage selects backend drivers for the datastore in this order:

1. IndexedDB
2. WebSQL
3. localStorage

If you would like to force usage of a particular driver you can use $setStorageDriver() with one or more of the
following parameters.

- localforage.INDEXEDDB
- localforage.WEBSQL
- localforage.LOCALSTORAGE

## Advanced Usage

You can register multiple instances, see below:

```js
// nuxt.config.js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    'nuxt-localforage'
  ],

  localForage: {
    instances: [{
      name: 'myApp',
      storeName: 'images'
    }, {
      name: 'myApp',
      storeName: 'fileSystem'
    }]
  }
})

/**
 * Composition API
 */

// for images
const imagesStorage = useLocalForage('images')
await imagesStorage.setItem(key, value)

// for fileSystem
const fileSystemStorage = useLocalForage('fileSystem')
await fileSystemStorage.setItem(key, value)

/**
 * Options API
 */

// for images
await this.$localforage.images.setItem(key, value)

// for fileSystem
await this.$localforage.fileSystem.setItem(key, value)
```

## License

[MIT](./LICENSE) License © 2022-Present [Elone Hoo](https://github.com/elonehoo)
