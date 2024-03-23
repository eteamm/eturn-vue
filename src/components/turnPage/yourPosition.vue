<template>
  <div class="yourTurn">
    <span class="yourTurnTitle">ТВОЙ ЧЕРЕД</span>
    <div class="yourTurnBlock">
      <div class="yourTurnBlockIn">
        <div>#{{getCurrentPosition.number}}</div>
        <div class="mainElementTurn">
          <p>{{getCurrentPosition.name}}</p>
          <p>{{getCurrentPosition.group}}</p>
          <div>
            <p v-if="getCurrentPosition.difference>0" class="countNeedWait">Перед тобой {{getCurrentPosition.difference}} человек</p>
          </div>
        </div>
        <div v-on:click="deleteCurrentPosition">
          <img src="../../assets/img/cross.svg" style="width:20px"  alt="delete">
        </div>
      </div>
      <div v-if="getCurrentPosition.difference===0">
        <button v-bind:class="{BtnYourTurnGoOut: getCurrentPosition.start, BtnYourTurnGoIn: !getCurrentPosition.start}" v-on:click="changePositionStatus" class="BtnYourTurnGoIn">{{btn}}</button>
      </div>
    </div>
    <div class="timer" v-show="visitable">Войдите, иначе ваша позиция пропадёт через {{timeMinutes}}:{{timeSeconds}} </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
export default {
  name: 'YourPosition',
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
    TurnPosition
  },
  computed:{
    ...mapGetters(['getCurrentPosition']),
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
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--
        this.timeMinutes = Math.floor( this.timeLeft / 60)
        this.timeSeconds = this.timeLeft - this.timeMinutes * 60
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
      }
    }
  },
  mounted() {
    let now = new Date();
    if (this.$store.getters.getCurrentPosition.dateStart !== null) {
      this.visitable = true

      // let h = this.$store.getters.getCurrentPosition.dateStart
      let timeTxt = "2024-03-23T15:41:02.250+00:00"
      let timeMs = Date.parse(timeTxt)
      let posDate = new Date(timeMs)
      let timeLeft = 120 - (now.getSeconds() - posDate.getSeconds())
      //this.$store.getters.getCurrentPosition.dateStart
      this.timeMinutes = Math.floor(timeLeft / 60)
      this.timeSeconds = timeLeft - this.timeMinutes * 60
      if (this.timeSeconds < 10) {
        this.timeSeconds = '0' + this.timeSeconds
      }
      this.timeLeft = timeLeft
      this.startTimer()
    }
  }
}
</script>
