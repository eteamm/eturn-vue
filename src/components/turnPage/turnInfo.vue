<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : null}}</span>
    <p class="TurnCreator">{{getCurrentTurn!=null ? getCurrentTurn.creator : null}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}}</span>
      <p class="qpeople">человек</p>
    </div>
  </div>
  <div class="ExtraInfo">
    <span>Подробнее: {{getCurrentTurn!=null ? getCurrentTurn.description : null}}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {id} from "postcss-selector-parser";

export default {
  name: 'TurnInfo',
  computed: mapGetters(['getCurrentTurn', 'getterToken', 'getCurrentTurnId']),
  mounted() {
    this.$store.dispatch("loadCurrentTurn",{id: this.$store.getters.getCurrentTurnId, token: this.$store.getters.getterToken})
  }
}
</script>
