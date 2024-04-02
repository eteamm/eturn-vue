<template>
  <div class="mainButton">
    <div v-if="isTurn && getCurrentError('position_error')">
      <h1>Hello, world!</h1>
    </div>
    <button class="makeTurnBtn">
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
    }
  }
}
</script>

