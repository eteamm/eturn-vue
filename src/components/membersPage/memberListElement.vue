<template>
  <div class="currentMember">
    <div>
      <p class="textName">{{ member.userName }}</p>
    </div>
    <div class="dropdown" v-if="getCurrentMember.access==='MODERATOR' || getCurrentMember.access==='CREATOR'">
      <button class="dots" v-on:click="changeVisible">
        <img src="../../../src/assets/img/threeDots.svg" alt="threeDots">
      </button>
      <div class="dropdown-content" v-show="visible">
        <a v-on:click="upgradeSelectedMember" href="#">{{title_menu}}</a>
        <a v-on:click="deleteSelectedMember" v-if="!getterMemberBlockShow(2)" href="#">Удалить</a>
        <a href="#" v-if="!getterMemberBlockShow(2)" v-on:click="blockMember">Заблокировать</a>
      </div>
    </div>
  </div>
</template>

<script>

import ToolBar from "@/components/membersPage/toolBar.vue";
import {mapGetters} from "vuex";
export default {
  name: 'MemberListElement',
  data() {
    return {
      visible: false,
    }
  },
  props: {
    member:{
      type:Object,
      default(){
        return{}
      }
    },
    type:0,
  },
  computed:{
    ...mapGetters(['getterToken', 'getterMemberBlockShow', 'getCurrentMember']),
    title_menu(){
      if (this.$store.getters.getterMemberBlockShow(0)){
        return "Разжаловать"
      }
      else if (this.$store.getters.getterMemberBlockShow(1)){
        return "Сделать администратором"
      }
      else {
        return "Разблокировать"
      }
    }
  },
  methods: {
    changeVisible() {
      this.visible = this.visible === false;
    },
    deleteSelectedMember() {
      this.$store.dispatch("deleteMember", {token: this.$store.getters.getterToken, id: this.member.id})
    },
    blockMember(){
      if(this.$store.getters.getterMemberBlockShow(0) || this.$store.getters.getterMemberBlockShow(1)){
        this.$store.dispatch("updateMember", {token: this.$store.getters.getterToken, id: this.member.id, type: "BLOCKED"})
      }
    },
    upgradeSelectedMember() {
      console.log(this.member.access)
      if (this.$store.getters.getterMemberBlockShow(0)){
        this.$store.dispatch("updateMember", {token: this.$store.getters.getterToken, id: this.member.id, type: "MEMBER"})
      }
      else if (this.$store.getters.getterMemberBlockShow(1)){
        this.$store.dispatch("updateMember", {token: this.$store.getters.getterToken, id: this.member.id, type: "MODERATOR"})
      }
      else{
        this.$store.dispatch("updateMember", {token: this.$store.getters.getterToken, id: this.member.id, type: "MEMBER"})
      }
    }
  }

}
</script>

