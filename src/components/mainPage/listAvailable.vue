<template>
  <block-available
    v-for="block in $store.state.queue1"
    :queue_data="block"
  />
</template>
<script>
import BlockAvailable from "@/components/mainPage/blockAvailable.vue";
export default {
  name: "listAvailable",
  components: {
    BlockAvailable
  },
  props: {},
  data() {
    return {}
  }
}
</script>
