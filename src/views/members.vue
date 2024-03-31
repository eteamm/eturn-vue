<template>
  <div>
    <Header title-name="Участники" title-description="изменение прав" />
    <div class="arrowBackBtn" v-on:click="goToMainPage">
      <img src="../assets/img/arrowBack.svg"  alt="exit">
    </div>

    <div class="containerQuantity">
      <div id="quantityAdmins">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}} администраторов</div>
      <div id="quantityMembers">{{getCurrentMembers!=null ? getCurrentMembers : null}} участников</div>
    </div>

    <MemberListBlock header="Администраторы" type="0"/>

    <MemberListBlock header="Участники" type="1"/>

    <MemberListBlock header="Заблокированные" type="2"/>
  </div>

</template>
<script>

import Header from "@/components/header.vue";
import QInfo from "@/components/createPage/CreateInfo.vue";
import MemberListBlock from "@/components/membersPage/memberListBlock.vue";
import MemberListElement from "@/components/membersPage/memberListElement.vue";
import AddGroup from "@/components/createPage/CreateGroup.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {mapGetters} from "vuex";
export default {
  name: 'Members',
  components: {
    AddGroup,
    QInfo,
    Header,
    MemberListBlock,
    MemberListElement
  },
  beforeCreate() {
    this.$store.dispatch("checkToken")
  },
  created() {
    this.$store.dispatch("checkToken")
    const route = useRoute()
    this.id=route.params.id
  },
  data(){
    return{
      id:0
    }
  },
  methods: {
    goToMainPage() {
      this.$store.dispatch("cleanTurnAndPosition")
      this.$store.dispatch("checkToken")
      const route = useRoute()
      router.push("/turn/"+this.id)
    }
  },
  computed: mapGetters(['getCurrentMembers', 'getCurrentAdmins'])
}
</script>




