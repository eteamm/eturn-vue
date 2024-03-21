<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | Eturn` : `Eturn` }}</template>
  </metainfo>
  <header />
  <router-view />
  <footer />
</template>

<script>

import {useMeta} from 'vue-meta'
export default {
  name: 'app',
  setup () {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'ru', amp: true }
    })
  }
}
</script>
