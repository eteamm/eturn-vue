<template>
  <block-on-main-page
    v-for="block in $store.state.myTurn"
    :Turn_data="block"

  />
</template>

<script>
import BlockOnMainPage from "@/components/mainPage/blockOnMainPage.vue";
export default {
  name: "listMy",
  components: {
    BlockOnMainPage
  },
  props: {},
  data() {
    return {
    }
  }
}
</script>
