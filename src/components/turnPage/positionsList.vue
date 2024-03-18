<template>
<div class="wholeTurn">
  <span class="yourTurnTitle">ВСЯ ОЧЕРЕДЬ</span>
</div>
  <TurnPosition
    v-for="pos in getterPositionsList"
    :position=pos
  />
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import {mapGetters} from "vuex";
export default{
  name: 'positionsList',
  components:{
    TurnPosition
  },
  computed:{
    ...mapGetters(['getterPositionsList'])
  },
  mounted(){
    console.log('turn',this.turn);
  }
}
</script>

