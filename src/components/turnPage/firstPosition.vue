<template>
  <div class="yourTurn">
    <span class="yourTurnTitle">ТЕКУЩАЯ ПОЗИЦИЯ</span>
    <div class="yourTurnBlock">
      <div class="yourTurnBlockIn">
        <div>#{{getFirstPosition.number}}</div>
        <div class="mainElementTurn">
          <p>{{getFirstPosition.name}}</p>
          <p>{{getFirstPosition.group}}</p>
        </div>
        <div v-on:click="deleteCurrentPosition">
          <img class="deletePosition" src="../../assets/img/cross.svg" style="width:20px; padding-top: 10px"  alt="delete">
        </div>
      </div>
      <div v-if="getFirstPosition.difference===0">
        <button v-bind:class="{BtnYourTurnGoOut: getFirstPosition.start, BtnYourTurnGoIn: !getFirstPosition.start}" v-on:click="changePositionStatus" class="BtnYourTurnGoIn">{{btn}}</button>
      </div>
    </div>
    <div class="timer" v-show="visitable && !getFirstPosition.start">Позиция студента пропадет через {{timeMinutes}}:{{timeSeconds}} </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
import Loader from "@/components/loader.vue";
export default {
  name: 'firstPosition',
  data() {
    return {
      timeMinutes: 0,
      timeSeconds: 0,
      timeLeft: 0,
      timer: null,
      visitable: false
    }
  },
  components: {
    Loader,
    TurnPosition
  },
  computed:{
    ...mapGetters(['getFirstPosition', 'getCurrentPosition']),
    btn(){
      if (this.$store.getters.getFirstPosition.start){
        return "выйти";
      }
      else{
        return "войти";
      }
    }
  },
  methods: {
    changePositionStatus() {
      this.visitable = false;
      this.stopTimer()
      this.$store.dispatch("changeFirstPositionStatus", {token: this.$store.getters.getterToken, posId: this.$store.getters.getFirstPosition.id, status: this.$store.getters.getFirstPosition.start, turnId: this.$store.getters.getterTurnId})
    },
    deleteCurrentPosition(){
      this.$store.dispatch("deletePosition", {token: this.$store.getters.getterToken, id: this.$store.getters.getFirstPosition.id, turnId: this.$store.getters.getterTurnId})
      this.$store.dispatch("loadFirstTurnPosition", {token: this.$store.getters.getterToken, turn: this.id})
      this.$store.dispatch("loadPositionList", {token: this.$store.getters.getterToken, turn: this.$store.getters.getterTurnId})
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--
        this.timeMinutes = Math.floor( this.timeLeft / 60)
        this.timeSeconds = this.timeLeft  - this.timeMinutes * 60
        if(this.timeSeconds < 10) {
          this.timeSeconds = '0' + this.timeSeconds
        }
      },1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    }
  },
  watch: {
    timeLeft(time) {
      if (time === 0) {
        this.stopTimer()
        this.$store.dispatch("loadPositionList", {token: this.$store.getters.getterToken, turn: this.$store.getters.getterTurnId})
        this.$store.dispatch("loadFirstPosition", {token: this.$store.getters.getterToken, turn: this.$store.getters.getterTurnId})
        this.$store.dispatch("loadFirstTurnPosition", {token: this.$store.getters.getterToken, turn: this.id})
      }
    },
    getFirstPosition(newVal, oldVal){
      let now = new Date();
      if (!newVal.start){
        if (newVal.dateEnd !== null) {
          this.visitable = true
          let timeTxt = newVal.dateEnd
          // let timeTxt = "2024-03-23T15:41:02.250+00:00"
          let timeMs = Date.parse(timeTxt)
          let posDate = new Date(timeMs)
          let timeLeft = posDate.getTime() - now.getTime()
          this.timeMinutes = Math.floor(timeLeft / 60000)
          this.timeSeconds = Math.floor(timeLeft / 1000) - this.timeMinutes * 60
          if (this.timeSeconds < 10) {
            this.timeSeconds = '0' + this.timeSeconds
          }
          this.timeLeft = Math.floor(timeLeft / 1000)
          this.startTimer()
        }
      }

    }
  },
  mounted() {
    let now = new Date();
    if (this.$store.getters.getFirstPosition.dateEnd !== null) {
      this.visitable = true
      let timeTxt = this.$store.getters.getFirstPosition.dateEnd
      // let timeTxt = "2024-03-23T15:41:02.250+00:00"
      let timeMs = Date.parse(timeTxt)
      let posDate = new Date(timeMs)
      console.log("date", posDate);
      let timeLeft = posDate.getTime() - now.getTime()
      this.timeMinutes = Math.floor(timeLeft / 60000)
      this.timeSeconds = Math.floor(timeLeft / 1000) - this.timeMinutes * 60
      if (this.timeSeconds < 10) {
        this.timeSeconds = '0' + this.timeSeconds
      }
      this.timeLeft = Math.floor(timeLeft / 1000)
      this.startTimer()
    }
  }
}
</script>
