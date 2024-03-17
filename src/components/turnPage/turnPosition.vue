<template>
  <div class="PositionBlock">
    <span class ="PositionBlockNumber">#{{position.number}} </span>
    <div>
        <p class="PositionBlockName" v-bind:class="{PositionBlockNameOnly:position.group===null}">{{position.name}}</p>
        <p class="PositionBlockGroup" v-if="position.group!==null">{{position.group}}</p>

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
