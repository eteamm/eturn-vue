<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : null}}</span>
    <p class="TurnCreator">{{getCurrentTurn!=null ? getCurrentTurn.description : null}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}}</span>
      <p class="qpeople">человек</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {id} from "postcss-selector-parser";

export default {
  name: 'TurnInfo',
  // methods: {id},
  // props: ['turnTitle', 'turnCreator', 'q', 'id'],
  computed: mapGetters(['getCurrentTurn', 'getterToken', 'getCurrentTurnId']),
  mounted() {
    this.$store.dispatch("loadCurrentTurn",this.$store.getters.getCurrentTurnId, this.$store.getters.getterToken)
  }
}
</script>
