<template>
  <div>
    <Header title-name="Очередь" title-description="основная информация" />
  </div>
  <div>
    <QueueInfo turn-title="Зачетная неделя" turn-creator="Железняк Александр Владимирович" :id="id"/>
  </div>
  <div>
    <ExtraInfo extrainfo="Приходим в ауд. 2317 в 13:00"/>
  </div>
  <div>
    <QueueButtons/>
  </div>
  <YourTurn/>
  <Wholeturn/>
  <div>
    <main-button button-text="встать в очередь" />
  </div>
</template>


<script>
import Header from "@/components/header.vue";
import QueueInfo from "@/components/turnPage/turnInfo.vue";
import QueueButtons from "@/components/turnPage/turnBtns.vue";
import MemberInQueue from "@/components/turnPage/turnPosition.vue";
import MainButton from "@/components/mainButton.vue";
import ExtraInfo from "../components/turnPage/extraInfo.vue";
import Wholeturn from "@/components/turnPage/turnList.vue";
import YourTurn from "@/components/turnPage/yourTurn.vue";
export default {
  name: 'Queue',
  components: {
    YourTurn,
    MainButton,
    MemberInQueue,
    QueueButtons,
    Header,
    QueueInfo,
    ExtraInfo,
    Wholeturn
  },
  data () {
    return {id: 0}
  },
  created() {
    this.id = this.$route.params.id;
  },
  props: ['id', 'type'],
}
</script>
