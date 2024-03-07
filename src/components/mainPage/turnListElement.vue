<template>
    <div class="TurnBlock1" v-on:click="goToTurnPage">
      <div class="divRightButton" v-on:click="goToTurnPageBtn">
          <button class="joinBtn" v-if="this.$store.getters.getterTurnAccess === 'memberOut'">вступить</button>
      </div>
      <div class="nameTurn">
        {{Turn_data.name}}
      </div>
      <div class="nameTeacher">
        {{ Turn_data.creator }}
      </div>
      <div class="description" v-if="this.$store.getters.getterTurnAccess === 'memberOut'">
        описание: {{Turn_data.description}}
      </div>
      <div class="quantityPeople">
        {{Turn_data.countUsers}} человек
      </div>
    </div>
</template>

<script>

import router from "@/router";

export default {
  name: 'turnListElement',
  methods: {
    goToTurnPage(){
      if (this.$store.getters.getterTurnAccess === 'memberIn') {
        this.$router.push('/turn');
        this.$store.dispatch('changeTurnId', this.Turn_data.id);
      }
    },
    goToTurnPageBtn() {
      this.$router.push('/turn');
      this.$store.dispatch('changeTurnId', this.Turn_data.id);
    }
  },
  props: {
    Turn_data: {
      type: Object,
      default() {
        return {}
      }
    },
    type: "memberIn",
  },
  computed:{
    joinBtnVisible: ()=>{
      return this.type !== "memberIn";
    }
  },
}
</script>

