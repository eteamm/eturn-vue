<template>
  <div class="background_modal1"></div>
  <div class="modal-overlay">
    <div class="modal1">
      <p class="modalColorTxt">Заполнены не все параметры!</p>
      <button class="modalButton" v-on:click="this.$emit('visitable')">хорошо</button>
    </div>
    <div class="close">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visitable: false
    }
  },
  emits: ['visitable']
}
</script>
