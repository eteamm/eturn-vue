<template>
  <div class="TurnInfo">
    <div class="Title">
      <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : "..."}}</span>
      <p class="TurnCreator">название очереди</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}}</span>
      <p class="qpeople">{{ people[getIndex] }}</p>
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
  computed: {
    ...mapGetters(['getCurrentTurn', 'getterToken', 'getCurrentTurnId']),
    getIndex() {
      let i = this.$store.getters.getCurrentTurn!=null ? this.$store.getters.getCurrentTurn.countUsers : null
      if (i % 100 === 12 || i % 100 === 13 || i % 100 === 14)
        return this.index = 0
      return this.index = i % 10
    }
  },
  data() {
    return {
      people: ["человек", "человек", "человека", "человека", "человека", "человек", "человек", "человек", "человек", "человек",],
      index: 0
    }
  }
}
</script>
