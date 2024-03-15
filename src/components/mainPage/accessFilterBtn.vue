<template>
  <div class="typeTurn">
    <div class="myTurnActive" :aria-disabled="this.$store.getters.getLoading('turn_loading') === true" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="myTurnFunction">
      МОИ
    </div>
    <div class="availableNotActive" :aria-disabled="this.$store.getters.getLoading('turn_loading') === true" v-bind:class="{availableActive: !visitable}" v-on:click="AvailableTurnFunction">
      ДОСТУПНЫЕ
    </div>
  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";

export default {
  name: 'AccessFilterBtn',
  components: {},
  data() {
    return {
      visitable: true
    }
  },
  computed: {
    ...mapState(['listTurn']),
    ...mapGetters(['getterUserId', "getterTurnAccess", "getterTurnType", "getterToken"]),
  },
  methods:{
    myTurnFunction(){
      this.visitable = true
      let typeTurn = this.$store.getters.getterTurnType
      this.$store.dispatch("changeAccessTurn", {token: this.$store.getters.getterToken, access: "memberIn", type:typeTurn})
    },
    AvailableTurnFunction(){
      this.visitable = false
      let typeTurn = this.$store.getters.getterTurnType
      // console.log("id",typeTurn)
      this.$store.dispatch("changeAccessTurn", {token: this.$store.getters.getterToken, access: "memberOut", type:typeTurn})
    }
  }
}
</script>
