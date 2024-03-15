<template>
  <div class="upperBtns">
      <button class="btnLeftAction" v-on:click="goToMemberPage">участники </button>
      <button>поделиться</button>
      <button class="btnRightAction">выйти</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'TurnBtns',
  methods: {
    goToMemberPage() {
      router.push("/members")
    }
  }
}
</script>
