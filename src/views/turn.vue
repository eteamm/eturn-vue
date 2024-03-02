<template>
  <div>
    <Header title-name="Очередь" title-description="основная информация" />
  </div>
  <div>
    <TurnInfo turn-title="Зачетная неделя" turn-creator="Железняк Александр Владимирович"/>
  </div>
  <div>
    <ExtraInfo extrainfo="Приходим в ауд. 2317 в 13:00"/>
  </div>
  <div>
    <TurnBtns/>
  </div>
  <YourTurn/>
  <positions-list/>
  <div>
    <main-button button-text="встать в очередь" />
  </div>
</template>


<script>
import Header from "@/components/header.vue";
import TurnInfo from "@/components/turnPage/turnInfo.vue";
import TurnBtns from "@/components/turnPage/turnBtns.vue";
import TurnPosition from "@/components/turnPage/turnPosition.vue";
import MainButton from "@/components/mainButton.vue";
import ExtraInfo from "../components/turnPage/extraInfo.vue";
import PositionsList from "@/components/turnPage/positionsList.vue";
import YourTurn from "@/components/turnPage/yourTurn.vue";
import router from "@/router";
import {mapGetters, mapState} from "vuex";
export default {
  name: 'Turn',
  components: {
    YourTurn,
    MainButton,
    TurnPosition,
    TurnBtns,
    Header,
    TurnInfo,
    ExtraInfo,
    PositionsList
  },
  data () {
    return {id: 0}
  },
  computed:{
    ...mapGetters(['getterToken'])
  },
  props: ['id', 'type'],
  beforeMount(){
    let token = this.$store.getters.getterToken
    if (token==null){
      router.push("/")
    }
  }
}
</script>
