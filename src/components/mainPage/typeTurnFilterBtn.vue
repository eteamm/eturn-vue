<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="eduTurnFunction">
      УЧЕБНЫЕ
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="orgTurnFunction">
      ОРГАНИЗАЦИОННЫЕ
    </div>
  </div>
</template>

<script>
// import ListMy from "@/components/mainPage/listMy.vue";
// import ListAvailable from "@/components/mainPage/turnList.vue";

import {mapGetters, mapState} from "vuex";

export default {
  name: 'typeTurnFilterBtn',
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
    orgTurnFunction(){
      this.visitable = false
      let accessTurn = this.$store.getters.getterTurnAccess
      this.$store.dispatch("changeTypeTurn", {token: this.$store.getters.getterToken, access: accessTurn, type:"org"})
    },
    eduTurnFunction(){
      this.visitable = true
      let accessTurn = this.$store.getters.getterTurnAccess
      this.$store.dispatch("changeTypeTurn", {token: this.$store.getters.getterToken, access: accessTurn, type:"edu"})
    }
  }
}

</script>
