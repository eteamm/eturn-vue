<template>
  <block-available
    v-for="block in $store.state.availableTurn"
    :queue_data="block"
  />
</template>
<script>
import BlockAvailable from "@/components/mainPage/blockAvailable.vue";
import {mapState} from "vuex";
import {mapGetters} from "vuex"
import Vuex from "vuex";

export default {
  name: "listAvailable",
  components: {
    BlockAvailable
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['availableTurn']),
    ...mapGetters(['getterUserId']),
  },
  mounted() {
    this.$store.dispatch('loadAvailableTurn',{id: this.$store.getters.getterUserId, type: 'edu', access: 'available'})
  },
}
</script>
