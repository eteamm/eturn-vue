<template>
  <turn-list-element
    v-for="block in $store.state.listTurn"
    :Turn_data="block"
  />
</template>
<script>
import TurnListElement from "@/components/mainPage/turnListElement";
import {mapState} from "vuex";
import {mapGetters} from "vuex"
import Vuex from "vuex";

export default {
  name: "TurnList",
  components: {
    TurnListElement
  },
  props: {
    typeTurn: "edu",
    accessTurn: "participates"
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['listTurn']),
    ...mapGetters(['getterUserId']),
  },
  mounted() {
    this.$store.dispatch('loadListTurn',{id: this.$store.getters.getterUserId, type: this.typeTurn, access: this.accessTurn})
  },
}
</script>
