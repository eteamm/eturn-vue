<template>
  <div class="PositionBlock">
    <span class ="PositionBlockNumber">#{{position.number}} </span>
    <div>
        <p class="PositionBlockName" v-bind:class="{PositionBlockNameOnly:position.group===null}">{{position.name}}</p>
        <p class="PositionBlockGroup" v-if="position.group!==null">{{position.group}}</p>

    </div>
    <div v-if="getCurrentMember.idUser===position.userId || this.$store.getters.getterRoleUser === 'MODERATOR'" v-on:click="deleteCurrentPosition(position.id)" class="deletePosition">
      <img src="../../assets/img/cross.svg"  alt="delete">
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
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
    ...mapGetters(['getterUserId', 'getCurrentMember', 'getterTurnId'])
  },
  methods:{
    deleteCurrentPosition(positionId){
      this.$store.dispatch("deletePosition", {token: this.$store.getters.getterToken, id: positionId, turnId: this.$store.getters.getterTurnId})
    }
  }
}
</script>
