<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="myTurnFunction">
      МОИ
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="AvailableTurnFunction">
      ДОСТУПНЫЕ
    </div>
  </div>
</template>

<script>

export default {
  name: 'AccessFilterBtn',
  components: {},
  data() {
    return {
      visitable: true
    }
  },
  methods:{
    myTurnFunction(){
      this.visitable = true
      this.$emit("accessType", "participates")
    },
    AvailableTurnFunction(){
      this.visitable = false
      this.$emit("accessType", "available")
    }
  }
}
</script>
