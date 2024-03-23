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
    <div style="color: red"> {{time}} </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
export default {
  name: 'YourPosition',
  data() {
    return {
      time: 10
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
      this.$store.dispatch("changePositionStatus", {token: this.$store.getters.getterToken, posId: this.$store.getters.getCurrentPosition.id, status: this.$store.getters.getCurrentPosition.start, turnId: this.$store.getters.getterTurnId})
    },
    deleteCurrentPosition(){
      this.$store.dispatch("deletePosition", {token: this.$store.getters.getterToken, id: this.$store.getters.getCurrentPosition.id, turnId: this.$store.getters.getterTurnId})
    },
  },
  mounted() {
    let now = new Date();
    // let h = this.$store.getters.getCurrentPosition.dateStart
    let h = "2024-03-23T14:32:02.250+00:00"
    let h1 = Date.parse(h)
    let posDate = new Date(h1)
    //this.$store.getters.getCurrentPosition.dateStart
    this.time = now.getMinutes() - posDate.getMinutes()
  }
}
</script>
