<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : null}}</span>
    <p class="TurnCreator">{{getCurrentTurn!=null ? getCurrentTurn.creator : null}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}}</span>
      <p class="qpeople">{{ people[index] }}</p>
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
