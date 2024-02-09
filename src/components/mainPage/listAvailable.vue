<template>
  <block-available
    v-for="block in $store.state.availableTurn"
    :queue_data="block"
  />
</template>
<script>
import BlockAvailable from "@/components/mainPage/blockAvailable.vue";
import {mapState} from "vuex";

export default {
  name: "listAvailable",
  components: {
    BlockAvailable
  },
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('loadAvailableTurn')
  },
  computed: mapState(['availableTurn'])
}
</script>
