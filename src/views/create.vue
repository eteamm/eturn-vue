<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <Header title-name="Создать" title-description="новая очередь" />
        <QInfo header = "название очереди" type="name"/>
        <QInfo header = "описание" type="description"/>
<!--        <QInfo header = "частота"/>-->
        <QParameters/>
<!--    <p style = "color: white" class="SubHeader">допустимые группы</p>-->
<!--    <AddGroup />-->
        <main-button v-on:click="getTurn()" button-text="создать" id="endPage" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import QInfo from "@/components/createPage/CreateInfo.vue";
import ExtraInfo from "@/components/turnPage/extraInfo.vue";
import ElementHeader from"@/components/createPage/CreateHeader.vue";
import QDescription from "@/components/createPage/CreateDescription.vue";
import QFrequency from "@/components/createPage/CreateFrequency.vue";
import QParameters from "@/components/createPage/CreateParameters.vue";
import AddGroup from "@/components/createPage/CreateGroup.vue";
import {mapGetters} from "vuex";
import MainButton from "@/components/mainButton";
import router from "@/router";

export default {
  name: 'Create',
  components: {
    AddGroup,
    Header,
    QInfo,
    ExtraInfo,
    ElementHeader,
    QDescription,
    QFrequency,
    QParameters,
    MainButton
  },
  computed:{
    ...mapGetters(['getterRoleUser','getterCreateTurn','getterUserId', 'getterToken'])
  },

  beforeCreate() {
    this.$store.dispatch("checkToken")
  },
  mounted() {
    this.$store.dispatch("saveTurnProperty", {nameP: "creator", valueP: this.$store.getters.getterUserId})
  },
  methods:{
    getTurn(){
      let turn = this.$store.getters.getterCreateTurn
      let accessValid = false
      let validProps = false
      let validTypes = false
      if (turn.turnAccess==="FOR_ALLOWED_ELEMENTS"){
        if (turn.allowedCourses.length!==0 || turn.allowedFaculties.length!==0 || turn.allowedGroups.length!==0){
          accessValid = true
        }
        else{
          accessValid = false
          console.log("status", "bad!");
        }
      }
      else{
        accessValid = true
      }
      if (turn.name!=null && turn.description!=null){
        validProps = true
      }
      else{
        validProps = false
      }
      if (turn.turnAccess!=null && turn.turnType!=null){
        validTypes = true
      }
      else{
        router.push("/")
        validTypes = false
      }
      if(validProps && accessValid && validTypes){
        this.$store.dispatch("createTurn", {turn: turn, token: this.$store.getters.getterToken})
      }
    }
  }
}
</script>
