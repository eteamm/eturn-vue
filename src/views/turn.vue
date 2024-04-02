<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
          <Header title-name="Очередь" title-description="основная информация" />
        <div class="arrowBackBtn" v-on:click="goToMainPage">
          <img src="../assets/img/arrowBack.svg"  alt="exit">
        </div>
        <div>
          <TurnInfo/>
        </div>
        <div>
          <TurnBtns/>
        </div>
        <div>
          <!--          <div style="position: relative;" v-show="this.$store.getters.getLoading('position_loading')">-->
          <!--            <loader />-->
          <!--          </div>-->
          <FirstPosition v-if="showFirst"/>
        </div>
        <div>
          <div style="position: relative;" v-show="this.$store.getters.getLoading('position_loading')">
            <loader />
          </div>
          <YourPosition v-if="getCurrentPosition!==null"/>
        </div>
        <div v-bind:class="{visibleOpacity: showOpacity}">
          <div>
            <positions-list/>
          </div>
          <div>
            <main-button turn="true" v-on:click="createPosition" button-text="встать в очередь" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.visibleOpacity {
  opacity: 0.3;
}
</style>

<script>
import Header from "@/components/header.vue";
import TurnInfo from "@/components/turnPage/turnInfo.vue";
import TurnBtns from "@/components/turnPage/turnBtns.vue";
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import MainButton from "@/components/mainButton.vue";
import PositionsList from "@/components/turnPage/positionsList.vue";
import YourPosition from "@/components/turnPage/yourPosition.vue";
import FirstPosition from "@/components/turnPage/firstPosition";
import router from "@/router";
import {mapGetters, mapState} from "vuex";
import { useRoute } from 'vue-router'
import Loader from "@/components/loader.vue";
export default {
  name: 'Turn',
  components: {
    Loader,
    YourPosition,
    MainButton,
    TurnPosition,
    TurnBtns,
    Header,
    TurnInfo,
    PositionsList,
    FirstPosition
  },
  data () {
    return {id: 0, timer: null}
  },
  computed:{
    showOpacity() {
      if (this.$store.getters.getCurrentPosition !== null) {
        return this.$store.getters.getCurrentPosition.difference === 0;
      } else {
        return false;
      }
    },
    ...mapGetters(['getterToken', 'getCurrentPosition', 'getFirstPosition', 'getCurrentMember','getLoading', 'getFirstPosition']),
    showFirst(){
      if (this.$store.getters.getCurrentPosition!==null && this.$store.getters.getFirstPosition!==null){
        return (this.$store.getters.getCurrentMember.access==='MODERATOR' || this.$store.getters.getCurrentMember.access==='CREATOR') && this.$store.getters.getCurrentPosition.id!==this.$store.getters.getFirstPosition.id
      }
      else if (this.$store.getters.getFirstPosition!==null){
        return (this.$store.getters.getCurrentMember.access==='MODERATOR' || this.$store.getters.getCurrentMember.access==='CREATOR')
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkToken")
  },
  created() {
    const route = useRoute()
    const turnId = route.params.id
    this.id = turnId
    this.$store.dispatch("checkRootUser", {token: this.$store.getters.getterToken, turn: turnId})
  },
  mounted() {
    if (this.$store.getters.getCurrentMember===null){
      this.$store.dispatch("checkRootUser", {token: this.$store.getters.getterToken, turn: this.id})
    }
    this.$store.dispatch("setTurnIdValue", {turnId: this.id})
    this.$store.dispatch("loadCurrentTurn",{id: this.id, token: this.$store.getters.getterToken})
    this.$store.dispatch("loadPositionList", {token: this.$store.getters.getterToken, turn: this.id})
    this.$store.dispatch("loadFirstPosition", {token: this.$store.getters.getterToken, turn: this.id})
    this.$store.dispatch("loadFirstTurnPosition", {token: this.$store.getters.getterToken, turn: this.id})
    this.updatePage()
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
  props: ['id', 'type'],
  methods:{
    createPosition(){
      console.log(this.$store.getters.getterToken);
      this.$store.dispatch("createPosition", {token: this.$store.getters.getterToken, turn: this.id})
    },
    updatePage(){
      this.timer = setInterval(()=>{
        this.$store.dispatch("loadPositionList", {token: this.$store.getters.getterToken, turn: this.id})
        if(this.$store.getters.getCurrentPosition!==null){
          if (this.$store.getters.getCurrentPosition.difference!==0){
            this.$store.dispatch("loadFirstPosition", {token: this.$store.getters.getterToken, turn: this.id})
          }
        }
        else{
          this.$store.dispatch("loadFirstPosition", {token: this.$store.getters.getterToken, turn: this.id})
        }
      },10000)
    },
    goToMemberPage(){
      router.push("/members/"+this.id)
    },
    goToMainPage() {
      router.push("/")
    }
  }
}
</script>
