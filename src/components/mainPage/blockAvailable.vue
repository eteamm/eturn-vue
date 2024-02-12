<template>
  <div class="TurnBlockAvailable">
    <div class="divRightButton">
      <router-link :to="{name: 'turn', params: {id: Turn_data.id}, query: {type: 1}}" @click="$store.commit('changeId', Turn_data.id)">
        <button class="joinBtn" >вступить</button>
      </router-link>
    </div>
    <div class="nameTurnAndTeacher">
      <div class="nameTurn">{{Turn_data.name}}</div>
      <div class="nameTeacher">{{Turn_data.teacher}}</div>
    </div>
    <div class="moreDetailed">
      <b>Подробнее: </b>
      {{Turn_data.more}}
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/mainButton.vue";

export default {
  name: 'blockAvailable',
  components: {MainButton},
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
