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
    ...mapGetters(['getterUserId', "getterTurnAccess", "getterTurnType"]),
  },
  methods:{
    orgTurnFunction(){
      this.visitable = false
      let accessTurn = this.$store.getters.getterTurnAccess
      let idU = this.$store.getters.getterUserId
      this.$store.dispatch("changeTypeTurn", {access: accessTurn, type:"org", id: idU})
    },
    eduTurnFunction(){
      this.visitable = true
      let accessTurn = this.$store.getters.getterTurnAccess
      let idU = this.$store.getters.getterUserId
      this.$store.dispatch("changeTypeTurn", {access: accessTurn, type:"edu", id: idU})
    }
  }
}

</script>
