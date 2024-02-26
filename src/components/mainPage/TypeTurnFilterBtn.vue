<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="visitable = true">
      УЧЕБНЫЕ
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="visitable = false">
      ОРГАНИЗАЦИОННЫЕ
    </div>
  </div>
<!--  <list-my v-if="visitable" />-->
<!--  <list-available v-else />-->
</template>

<script>
// import ListMy from "@/components/mainPage/listMy.vue";
// import ListAvailable from "@/components/mainPage/turnList.vue";

export default {
  name: 'typeTurnFilterBtn',
  components: {},
  data() {
    return {
      visitable: true
    }
  }
}
</script>
