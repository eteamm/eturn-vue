<template>
<div class="wholeTurn">
  <span class="yourTurnTitle">ВСЯ ОЧЕРЕДЬ</span>
</div>
  <TurnPosition
    v-for="block in positions"
    :key="block.name"
    :Turn_list="block"
  />
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
export default{
  name: 'positionsList',
  components:{
    TurnPosition
  },
  props:{},
  data() {
    return{
      positions: [
        {
          k: '1',
          name: "Кадун Никита Андреевич ",
          group: "2391"
        },
        {
          k: '2',
          name: "Самоваров Иван Юрьевич ",
          group: "2391"
        },
        {
          k: '3',
          name: "Гончарова Александра Дмитриевна ",
          group: "2371"
        },
        {
          k: 4,
          name: "Колпаков Андрей Сергеевич ",
          group: "2370"
        },
        {
          k: 5,
          name: "Гончарова Александра Дмитриевна ",
          group: "2371"
        },
      ]
    }
  }
}
</script>

