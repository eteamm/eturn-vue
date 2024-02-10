<template>
  <block-on-main-page
    v-for="block in $store.state.myTurn"
    :queue_data="block"

  />
</template>

<script>
import BlockOnMainPage from "@/components/mainPage/blockOnMainPage.vue";
import {mapState} from "vuex";
import {mapGetters} from "vuex";
export default {
  name: "listMy",
  components: {
    BlockOnMainPage
  },
  props: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['myTurn']),
    ...mapGetters(['getterUserId']),
  },
  mounted() {
    this.$store.dispatch('loadMyTurn', {id: 1, type: 'edu', access: 'participates'})
  },
}
</script>
