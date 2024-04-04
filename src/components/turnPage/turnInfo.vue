<template>
  <div class="TurnInfo">
    <div class="Title">
      <p class="TurnCreator">название очереди</p>
      <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : "..."}}</span>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : "..."}}</span>
      <p class="qpeople">{{ people[index] }}</p>
    </div>
  </div>
  <div class="ExtraInfo">
    <p><span>Описание:</span> {{getCurrentTurn!=null ? getCurrentTurn.description : "..."}}</p>
    <p><span>Автор:</span> {{getCurrentTurn!=null ? getCurrentTurn.creator : "..."}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {id} from "postcss-selector-parser";

export default {
  name: 'TurnInfo',
  computed: mapGetters(['getCurrentTurn', 'getterToken', 'getCurrentTurnId']),
  data() {
    return {
      people: ["человек", "человек", "человека", "человека", "человека", "человек", "человек", "человек", "человек", "человек",],
      index: 0
    }
  },
  beforeUpdate() {
    let i = this.$store.getters.getCurrentTurn!=null ? this.$store.getters.getCurrentTurn.countUsers : null
    if (i === 12 || i === 13 || i === 14)
      this.index = 0
    this.index = i % 10
  }
}
</script>
