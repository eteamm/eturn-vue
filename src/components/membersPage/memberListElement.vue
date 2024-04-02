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
        <a v-on:click="upgradeSelectedMember" href="#">{{t1}}</a>
        <a v-on:click="deleteSelectedMember" href="#">{{t2}}</a>
        <a href="#">{{t3}}</a>
        <a href="#">{{title_menu}}</a>
        <a v-on:click="deleteSelectedMember" href="#" v-if="!getterMemberBlockShow(2)">Удалить</a>
        <a href="#" v-if="!getterMemberBlockShow(2)">Заблокировать</a>
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
      t1: "",
      t2: "",
      t3: ""
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
      //console.log(this.$store.getters.getCurrentMember.userId)
      //alert('Кнопка нажата!');
      this.$store.dispatch("deleteMember", {token: this.$store.getters.getterToken, id: this.member.id})
    },
    upgradeSelectedMember() {
      //alert('Кнопка нажата!');
      console.log(this.member.access)
      this.$store.dispatch("updateMember", {token: this.$store.getters.getterToken, id: this.member.id, type: "MODERATOR"})
    }
  }

}
</script>

