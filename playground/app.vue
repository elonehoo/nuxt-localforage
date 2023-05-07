<script lang="ts" setup>
import {useLocalForage} from '../src/runtime/composables'
import {ref,onMounted} from 'vue'
const storage = useLocalForage()
const savedKey = ref<string>()
const key = ref('')
const value = ref('')
const listValue = ref()
async function list() {
  listValue.value = await storage.keys()
}

async function save() {
  // Save the value using key/value defined by the user
  await storage.setItem(key.value, value.value)
}

async function get() {
  // Get the value defined by the user
  const value = await storage.getItem(key.value)
  console.log('key->', key.value)
  console.log('value->', value)
}

onMounted(async () => {
  // Get the key
  const _savedKey = await storage.getItem('_key') as string

  // If defined, load the data
  if (_savedKey) {
    savedKey.value = _savedKey
    key.value = _savedKey
    value.value = await storage.getItem(key.value) as string
  }
})
</script>

<template>
  <div>
    <h3>Save value using LocalForage</h3>

    <label for="key">Key</label>
    <input id="key" v-model="key" type="text">

    <label for="value">Value</label>
    <input id="value" v-model="value" type="text">

    <button @click="save">
      Save
    </button>
    <button @click="get">
      Log
    </button>
    <button @click="list">
      List
    </button>
  </div>
  <div>
    {{ listValue }}
  </div>
</template>
