<template>
  <div class="PositionBlock">
    <span class ="PositionBlockNumber">#{{position.number}} </span>
    <div class="aboutmember">
    <span class="PositionBlockName">{{position.name}}</span><br>
    <span class="PositionBlockGroup">{{position.group}}</span>
    </div>
    <div v-if="getterUserId===position.userId" class="deletePosition">
      <img src="../../assets/img/cross.svg"  alt="delete">
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  // TODO rename turn_List to position
  // TODO Turn_list.userId == this.$store.userId -> v-if -> крестик
  // TODO image -> @click => deletePositionById(turn_list.id)
  name: 'TurnPosition',
  // components: ,
  props: {

    position: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    ...mapGetters(['getterUserId'])
  }
}
</script>
