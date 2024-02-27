<template>
  <router-link style="text-decoration: none" :to="{name: 'turn', params: {id: Turn_data.id}}" @click="$store.commit('changeCurrentTurnId', Turn_data.id)">
    <div class="TurnBlock1">
      <div class="nameTurn">
        {{Turn_data.name}}
      </div>
      <div class="nameTeacher">
        {{ Turn_data.teacher }}
      </div>
      <div class="quantityPeople">
        {{Turn_data.quantity}} человек
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'turnListElement',
  props: {
    Turn_data: {
      type: Object,
      default() {
        return {}
      }
    },
    type: "participates"
  },
  computed:{
    joinBtnVisible: ()=>{
      return this.type !== "participates";
    }
  }
}
</script>

