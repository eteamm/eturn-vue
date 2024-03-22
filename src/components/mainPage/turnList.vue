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
  mounted() {
    let typeTurn = this.$store.getters.getterTurnType
    let accessTurn = this.$store.getters.getterTurnAccess
    console.log(typeTurn)
    console.log(accessTurn)
    this.$store.dispatch(
      'loadListTurn',
      {
        token: this.$store.getters.getterToken,
        type: 'edu',
        access: 'memberIn'}
    )
  },
}
</script>
