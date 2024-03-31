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
        <a href="#">Разжаловать</a>
        <a v-on:click="deleteSelectedMember" href="#">Удалить</a>
        <a href="#">Заблокировать</a>
      </div>
    </div>
  </div>
</template>

<script>

import ToolBar from "@/components/membersPage/toolBar.vue";
export default {
  name: 'MemberListElement',
  data() {
    return {
      visible: false
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
  methods: {
    changeVisible() {
      this.visible = this.visible === false;
    },
    deleteSelectedMember() {
      //console.log(this.$store.getters.getCurrentMember.userId)
      //alert('Кнопка нажата!');
      this.$store.dispatch("deleteMember", {token: this.$store.getters.getterToken, id: this.$store.getters.getCurrentMember.id})
    }
  }
}
</script>

