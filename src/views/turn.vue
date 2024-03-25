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
          <YourPosition v-if="getCurrentPosition!==null"/>
        </div>
        <div>
          <positions-list/>
        </div>
        <div>
          <main-button v-on:click="createPosition" button-text="встать в очередь" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/header.vue";
import TurnInfo from "@/components/turnPage/turnInfo.vue";
import TurnBtns from "@/components/turnPage/turnBtns.vue";
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import MainButton from "@/components/mainButton.vue";
import PositionsList from "@/components/turnPage/positionsList.vue";
import YourPosition from "@/components/turnPage/yourPosition.vue";
import router from "@/router";
import {mapGetters, mapState} from "vuex";
import { useRoute } from 'vue-router'
export default {
  name: 'Turn',
  components: {
    YourPosition,
    MainButton,
    TurnPosition,
    TurnBtns,
    Header,
    TurnInfo,
    PositionsList
  },
  data () {
    return {id: 0}
  },
  computed:{
    ...mapGetters(['getterToken', 'getCurrentPosition'])
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
    this.$store.dispatch("setTurnIdValue", {turnId: this.id})
    this.$store.dispatch("loadCurrentTurn",{id: this.id, token: this.$store.getters.getterToken})
    this.$store.dispatch("loadPositionList", {token: this.$store.getters.getterToken, turn: this.id})
    this.$store.dispatch("loadFirstPosition", {token: this.$store.getters.getterToken, turn: this.id})

  },
  props: ['id', 'type'],
  methods:{
    createPosition(){
      console.log(this.$store.getters.getterToken);
      this.$store.dispatch("createPosition", {token: this.$store.getters.getterToken, turn: this.id})
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
