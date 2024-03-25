<template>
  <div class="upperBtns">
      <button class="btnLeftAction" v-on:click="goToMemberPage">участники</button>
      <button>поделиться</button>
      <button class="btnRightAction">выйти</button>
  </div>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
  name: 'TurnBtns',
  computed:{
    ...mapGetters(['getterTurnId'])
  },
  methods: {
    goToMemberPage() {
      router.push("/members/"+this.$store.getters.getterTurnId)
    }
  }
}
</script>
