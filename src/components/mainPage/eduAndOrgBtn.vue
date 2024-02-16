<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="visitable = true">
      <b class="">УЧЕБНЫЕ</b>
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="visitable = false">
      <b>ОРГАНИЗАЦИОННЫЕ</b>
    </div>
  </div>
<!--  <list-my v-if="visitable" />-->
<!--  <list-available v-else />-->
</template>

<script>
// import ListMy from "@/components/mainPage/listMy.vue";
// import ListAvailable from "@/components/mainPage/listAvailable.vue";

export default {
  name: 'eduAndOrgBtn',
  components: {},
  data() {
    return {
      visitable: true
    }
  }
}
</script>
