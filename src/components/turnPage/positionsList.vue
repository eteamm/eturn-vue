<template>
<div class="wholeTurn">
  <span class="yourTurnTitle">ВСЯ ОЧЕРЕДЬ</span>
  <h3 class="noPositionFound" v-show="noFound">Самое время встать в очередь...</h3>
</div>
  <TurnPosition
    v-for="pos in getterPositionsList"
    :position=pos
  />
  <div style="position: relative;" v-show="this.$store.getters.getLoading('allposition_loading')">
    <loader />
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
import Loader from "@/components/loader.vue";
export default{
  name: 'positionsList',
  components:{
    Loader,
    TurnPosition
  },
  computed:{
    ...mapGetters(['getterPositionsList','getLoading']),
    noFound(){
      return this.$store.getters.getterPositionsList===null;
    }
  },
  mounted(){
    console.log('turn',this.turn);
  }
}
</script>

