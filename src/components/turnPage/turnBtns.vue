<template>
  <div class="upperBtns">
    <div class="memberBtn">
      <button>участники</button>
    </div>
    <div class="shareBtn">
      <button>поделиться</button>
    </div>
    <router-link to="/">
    <div class="goOutBtn">
      <button>выйти</button>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'turnBtns'
}
</script>
