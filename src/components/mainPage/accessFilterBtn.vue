<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="myTurnFunction">
      МОИ
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="AvailableTurnFunction">
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
    ...mapGetters(['getterUserId', "getterTurnAccess", "getterTurnType"]),
  },
  methods:{
    myTurnFunction(){
      this.visitable = true
      let typeTurn = this.$store.getters.getterTurnType
      let idU = this.$store.getters.getterUserId
      this.$store.dispatch("changeAccessTurn", {access: "participates", type:typeTurn, id: idU})
    },
    AvailableTurnFunction(){
      this.visitable = false
      let typeTurn = this.$store.getters.getterTurnType
      let idU = this.$store.getters.getterUserId
      // console.log("id",typeTurn)
      this.$store.dispatch("changeAccessTurn", {access: "available", type:typeTurn, id: idU})
    }
  }
}
</script>
