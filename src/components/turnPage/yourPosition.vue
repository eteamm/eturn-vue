<template>
  <div class="yourTurn">
    <div class="yourTurnBlock">
      <div class="yourTurnBlockIn">
        <div class="invisible_number">#{{getCurrentPosition.number}}</div>
        <div>
          <p class="yourTurnTitle">Твоя позиция</p>
        </div>
      </div>
      <div class="yourTurnBlockIn">
        <div>#{{getCurrentPosition.number}}</div>
        <div class="mainElementTurn">
          <p>{{getCurrentPosition.name}}</p>
          <p>{{getCurrentPosition.group}}</p>
          <div>
            <p v-if="getCurrentPosition.difference>0" class="countNeedWait">Перед тобой {{getCurrentPosition.difference}} {{people[getIndex]}}</p>
          </div>
        </div>
        <div v-on:click="deleteCurrentPosition">
          <img class="deletePosition" src="../../assets/img/cross.svg" style="width:25px;padding-top: 10px"  alt="delete">
        </div>
      </div>
      <div v-if="getCurrentPosition.difference===0">
        <button v-bind:class="{BtnYourTurnGoOut: getCurrentPosition.start, BtnYourTurnGoIn: !getCurrentPosition.start}" v-on:click="changePositionStatus" class="BtnYourTurnGoIn">{{btn}}</button>
      </div>
    </div>
    <div class="timer" v-show="visitable && !getCurrentPosition.start">Войдите, иначе ваша позиция пропадёт через {{timeMinutes}}:{{timeSeconds}} </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
import Loader from "@/components/loader.vue";
export default {
  name: 'YourPosition',
  data() {
    return {
      timeMinutes: 0,
      timeSeconds: 0,
      timeLeft: 0,
      timer: null,
      visitable: false,
      people: ["человек", "человек", "человека", "человека", "человека", "человек", "человек", "человек", "человек", "человек",],
      index: 0
    }
  },
  components: {
    Loader,
    TurnPosition
  },
  computed:{
    ...mapGetters(['getCurrentPosition']),
    getIndex() {
      let i = this.$store.getters.getCurrentPosition!=null ? this.$store.getters.getCurrentPosition.difference : null
      if (i > 0 && i!=null){
        if (i % 100 === 12 || i % 100 === 13 || i % 100 === 14)
          return this.index = 0
        return this.index = i % 10
      }

    },
    btn(){
      if (this.$store.getters.getCurrentPosition.start){
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
      this.$store.dispatch("changePositionStatus", {token: this.$store.getters.getterToken, posId: this.$store.getters.getCurrentPosition.id, status: this.$store.getters.getCurrentPosition.start, turnId: this.$store.getters.getterTurnId})
    },
    deleteCurrentPosition(){
      this.$store.dispatch("deletePosition", {token: this.$store.getters.getterToken, id: this.$store.getters.getCurrentPosition.id, turnId: this.$store.getters.getterTurnId})
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
      }
    },
    getCurrentPosition(newVal, oldVal){
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
    if (this.$store.getters.getCurrentPosition.dateEnd !== null) {
      this.visitable = true
      let timeTxt = this.$store.getters.getCurrentPosition.dateEnd
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
