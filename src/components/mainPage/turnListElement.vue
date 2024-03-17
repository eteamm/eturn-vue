<template>
    <div class="TurnBlock1" v-on:click="goToTurnPage" v-bind:class="{cursor: this.$store.getters.getterTurnAccess === 'memberIn'}">
      <div class="divRightButton" v-on:click="goToTurnPageBtn">
          <button class="joinBtn" v-if="getterTurnAccess === 'memberOut'">вступить</button>
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
import {mapGetters, mapState} from "vuex";

export default {
  name: 'turnListElement',
  methods: {
    goToTurnPage(){
      if (this.$store.getters.getterTurnAccess !== 'memberOut') {
        // let date = new Date();
        // date.setTime(date.getTime() + (60*60*24 * 60 * 60));
        // const expires = "expires=" + date.toUTCString();
        // document.cookie = "turnType=" + this.Turn_data.id + "; " + expires + "; path=/";
        this.$router.push('/turn/'+ this.Turn_data.id);
        // this.$store.dispatch('changeTurnId', this.Turn_data.id);
      }
    },
    goToTurnPageBtn() {
      if (this.$store.getters.getterTurnAccess !== 'memberIn') {
        // let date = new Date();
        // date.setTime(date.getTime() + (60*60*24 * 60 * 60));
        // const expires = "expires=" + date.toUTCString();
        // document.cookie = "turnType=" + this.Turn_data.id + "; " + expires + "; path=/";
        this.$store.dispatch("addNewMember", {token: this.$store.getters.getterToken, turn: this.Turn_data.id})
      }
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
    },
    ...mapGetters(["getterTurnAccess", 'getterToken'])
  },
}
</script>

