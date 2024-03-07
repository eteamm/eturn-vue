<template>
    <div style="position: relative;">
      <div v-show="getLoading('turn_loading')">
        <loader />
      </div>
      <div>
        <turn-list-element
          v-for="block in getterTurnList"
          :Turn_data="block"
        />
      </div>
      <div v-show="getCurrentError('turn_error')" class="turnNotFound">
        <p>Очереди не найдены</p>
      </div>
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
  computed: {
    // ...mapState(['listTurn']),
    ...mapGetters(['getterToken', "getterTurnAccess", "getterTurnType", 'getterTurnList', 'getLoading', 'getCurrentError']),
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
    this.$store.dispatch('loadListTurn',{token: this.$store.getters.getterToken, type: 'edu', access: 'memberIn'})
  },
  // update() {
  //   let typeTurn = this.$store.getters.getterTurnType
  //   let accessTurn = this.$store.getters.getterTurnAccess
  //   this.$store.dispatch('loadListTurn',{id: this.$store.getters.getterUserId, type: typeTurn, access: accessTurn})
  // }
}
</script>
