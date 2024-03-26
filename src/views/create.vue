<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <Header title-name="Создать" title-description="новая очередь" />
        <div class="arrowBackBtn" v-on:click="goToMainPage">
          <img src="../assets/img/arrowBack.svg"  alt="exit">
        </div>
        <div class="SubHeader"><img src="../assets/img/pencil_create2.svg" alt="pencil">Основная информация</div>
        <QInfo header = "название очереди" type="name"/>
        <QInfo header = "описание" type="description"/>
<!--        <QInfo header = "частота"/>-->
        <QParameters/>
<!--    <p style = "color: white" class="SubHeader">допустимые группы</p>-->
<!--    <AddGroup />-->
        <div v-if="visitable === true">
          <window-create-error @visitable="visitable = false" />
        </div>
        <main-button v-on:click="getTurn()" button-text="создать" id="endPage" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import QInfo from "@/components/createPage/CreateInfo.vue"
import ElementHeader from"@/components/createPage/CreateHeader.vue";
import QParameters from "@/components/createPage/CreateParameters.vue";
import AddGroup from "@/components/createPage/CreateGroup.vue";
import {mapGetters} from "vuex";
import MainButton from "@/components/mainButton";
import router from "@/router";
import WindowCreateError from "@/components/createPage/windowCreateError.vue";

export default {
  name: 'Create',
  components: {
    WindowCreateError,
    AddGroup,
    Header,
    QInfo,
    ElementHeader,
    QParameters,
    MainButton,
  },
  data() {
    return {
      visitable: false
    }
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
        validTypes = false
      }
      if(validProps && accessValid && validTypes){
        this.visitable = false
        this.$store.dispatch("createTurn", {turn: turn, token: this.$store.getters.getterToken})
      } else {

        this.visitable = true
      }
    },
    goToMainPage() {
      router.push("/")
    }
  }
}
</script>
