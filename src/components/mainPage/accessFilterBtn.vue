<template>
  <div class="typeTurn">
    <div class="myTurnActive" v-bind:class="{myTurnNotActive: !visitable}" v-on:click="visitable = true">
      МОИ
    </div>
    <div class="availableNotActive" v-bind:class="{availableActive: !visitable}" v-on:click="visitable = false">
      ДОСТУПНЫЕ
    </div>
  </div>

  // TODO убрать вообще из компонента кнопок целый список
  <list-my v-if="visitable" />
  <turn-list v-else />
</template>

<script>
import ListMy from "@/components/mainPage/listMy.vue";
import TurnList from "@/components/mainPage/turnList.vue";

export default {
  name: 'AccessFilterBtn',
  components: {TurnList, ListMy},
  data() {
    return {
      visitable: true
    }
  }
}
</script>
