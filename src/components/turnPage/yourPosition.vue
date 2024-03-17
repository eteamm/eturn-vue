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
        <div>
          <img src="../../assets/img/cross.svg" style="width:20px"  alt="delete">
        </div>
      </div>
      <div v-if="getCurrentPosition.difference===0">
        <button v-bind:class="{BtnYourTurnGoOut: getCurrentPosition.start, BtnYourTurnGoIn: !getCurrentPosition.start}" class="BtnYourTurnGoIn">{{btn}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
export default {
  name: 'YourPosition',
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
  }
}
</script>
