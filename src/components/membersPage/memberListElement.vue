<template>
  <div class="currentMember">
    <div>
      <p class="textName">{{ member.userName }}</p>
    </div>
    <div class="dropdown">
      <button class="dots" v-on:click="changeVisible">
        <img src="../../../src/assets/img/threeDots.svg" alt="threeDots">
      </button>
      <div class="dropdown-content" v-show="visible">
        <a v-on:click="upgradeSelectedMember" href="#">{{t1}}</a>
        <a v-on:click="deleteSelectedMember" href="#">{{t2}}</a>
        <a href="#">{{t3}}</a>
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
    ...mapGetters(['getterToken'])
  },
  methods: {

    changeVisible() {
      if (this.member.access === "MODERATOR") {
        this.t1 = "Разжаловать"
        this.t2 = "Удалить"
        this.t3 = "Заблокировать"
      }
      if (this.member.access === "MEMBER") {
        this.t1 = "Сделать администратором"
        this.t2 = "Удалить"
        this.t3 = "Заблокировать"
      }
      if (this.member.access === "BLOCKED") {
        this.t1 = "Разблокировать"
        this.t2 = ""
        this.t3 = ""
      }
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

