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
  // metaInfo: {
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  //   ]
  // },
  setup () {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'ru', amp: true },
      viewport: "width=device-width, initial-scale=1"
    })
  }
}
</script>
