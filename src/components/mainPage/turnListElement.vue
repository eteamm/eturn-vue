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
        {{Turn_data.countUsers}} {{ people[getIndex] }}
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
        this.$store.dispatch("checkRootUser", {token: this.$store.getters.getterToken, turn: this.Turn_data.id})
        this.$router.push('/turn/'+ this.Turn_data.id);
      }
    },
    goToTurnPageBtn() {
      if (this.$store.getters.getterTurnAccess !== 'memberIn') {
        this.$store.dispatch("addNewMember", {token: this.$store.getters.getterToken, turn: this.Turn_data.id})
        this.$store.dispatch("checkRootUser", {token: this.$store.getters.getterToken, turn: this.Turn_data.id})
      }
    }
  },
  data() {
    return {
      people: ["человек", "человек", "человека", "человека", "человека", "человек", "человек", "человек", "человек", "человек",],
      index: 0
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
    ...mapGetters(["getterTurnAccess", 'getterToken']),
    getIndex() {
      let i = this.Turn_data.countUsers
      if (i % 100 === 12 || i % 100 === 13 || i % 100 === 14)
        return this.index = 0
      return this.index = i % 10
    }
  }
}
</script>

