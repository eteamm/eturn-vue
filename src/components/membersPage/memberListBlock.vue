<template>
  <div class="sameBlocks" >
    <img class="showing"  src="../../../src/assets/img/show.svg" alt="show" v-on:click="changeShow()">
    <img class="searching" src="../../../src/assets/img/search.svg" alt="search">
    <h3 class="mainHeader"><b>{{ header }}</b></h3>
    <div class="member" v-show="getterMemberBlockShow(this.type)">
      <MemberListElement v-for="mem in getterMemberList" :member=mem type="members"/>
    </div>
  </div>


</template>

<script>

import MemberListElement from "@/components/membersPage/memberListElement.vue";
import {mapGetters} from "vuex";
export default {
  name: 'MemberListBlock',
  props: ['header', 'type'],
  components: {
    MemberListElement
  },
  computed:{
    ...mapGetters(['getterMemberBlockShow', 'getterMemberList'])
  },
  methods:{
    changeShow(){
      let t = "";
      if(this.type == 0) t="MODERATOR";
      if(this.type == 1) t="MEMBER";
      if(this.type == 2) t="BLOCKED";
      this.$store.dispatch('loadMemberList',
        {
          token: this.$store.getters.getterToken,
          type: t,
          turnId: this.$store.getters.getterTurnId
        })
      this.$store.dispatch('changeMemberShow',{param: this.type})
    }
  }
}
</script>




