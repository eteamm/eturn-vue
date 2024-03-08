<template>
  <div>
    <Header title-name="Очередь" title-description="основная информация" />
  </div>
  <div>
    <TurnInfo/>
  </div>
  <div>
    <ExtraInfo/>
  </div>
  <div>
    <TurnBtns/>
  </div>
  <YourPosition/>
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
import YourPosition from "@/components/turnPage/yourPosition.vue";
import router from "@/router";
import {mapGetters, mapState} from "vuex";
export default {
  name: 'Turn',
  components: {
    YourPosition,
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
  beforeCreate() {
    this.$store.dispatch("checkToken")
  },
  props: ['id', 'type'],
}
</script>
