<template>
    <div style="position: relative;">
        <loader />
      <turn-list-element
        v-for="block in getterTurnList"
        :Turn_data="block"
      />
    </div>
</template>
<script>
import TurnListElement from "@/components/mainPage/turnListElement";
import {mapState} from "vuex";
import {mapGetters} from "vuex"
import Vuex from "vuex";
import Loader from "@/components/loader.vue";

export default {
  name: "TurnList",
  components: {
      Loader,
    TurnListElement
  },
  props: {

  },
  data() {
    return {}
  },
  computed: {
    // ...mapState(['listTurn']),
    ...mapGetters(['getterToken', "getterTurnAccess", "getterTurnType", 'getterTurnList']),
  },
  // watch:{
  //   turnList:{
  //     handler(oldValue, newValue){
  //       return newValue
  //     }
  //   }
  // },
  mounted() {
    let typeTurn = this.$store.getters.getterTurnType
    let accessTurn = this.$store.getters.getterTurnAccess
    this.$store.dispatch('loadListTurn',{token: this.$store.getters.getterToken, type: typeTurn, access: accessTurn})
  },
  // update() {
  //   let typeTurn = this.$store.getters.getterTurnType
  //   let accessTurn = this.$store.getters.getterTurnAccess
  //   this.$store.dispatch('loadListTurn',{id: this.$store.getters.getterUserId, type: typeTurn, access: accessTurn})
  // }
}
</script>
