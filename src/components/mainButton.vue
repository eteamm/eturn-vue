<template>
  <div class="mainButton">
    <Transition>
      <div v-if="isTurn && getCurrentError('position_error')">
        <h1 class="positionError">Вы уже вставали в очередь недавно. Через {{this.$store.getters.getCountPositionError}} {{people[getIndex]}} вы сможете сделать это снова!</h1>
      </div>
    </Transition>
    <button class="makeTurnBtn" v-bind:disabled="getCurrentError('position_error')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'MainButton',
  props: ['buttonText', 'turn'],
  computed: {
    ...mapGetters(['getCurrentError']),
    isTurn() {
      return this.turn != "false";
    },
    getIndex() {
      let i = this.$store.getters.getCountPositionError
      if (i % 100 === 11 || i % 100 === 12 || i % 100 === 13 || i % 100 === 14)
        return this.index = 0
      return this.index = i % 10
    }
  },
  data() {
    return {
      people: ["позиций", "позицию", "позиции", "позиции", "позиции", "позиций", "позиций", "позиций", "позиций", "позиций",],
      index: 0,
    }
  },
  methods: {
    isShow() {
      return !!(this.isTurn && this.$store.getters.getCurrentError('position_error'))
    }
  }

}
</script>

