<template>
  <router-link style="text-decoration: none" :to="{name: 'turn', params: {id: Turn_data.id}, query: {type: 0}}" @click="$store.commit('changeCurrentTurnId', Turn_data.id)">
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
  name: 'BlockOnMainPage',
  props: {
    Turn_data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

