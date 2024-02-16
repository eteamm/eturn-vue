<template>
<div class="wholeTurn">
  <span class="wholeturn">ВСЯ ОЧЕРЕДЬ</span>
</div>
  <TurnPosition
    v-for="block in members"
    :key="block.memberfio"
    :Turn_list="block"
  />
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
export default{
  name: 'WholeTurn',
  components:{
    TurnPosition
  },
  props:{},
  data() {
    return{
      members: [
        {
          k: '1',
          memberfio: "Кадун Никита Андреевич ",
          membergroup: "2391"
        },
        {
          k: '2',
          memberfio: "Самоваров Иван Юрьевич ",
          membergroup: "2391"
        },
        {
          k: '3',
          memberfio: "Гончарова Александра Дмитриевна ",
          membergroup: "2371"
        },
        {
          k: 4,
          memberfio: "Колпаков Андрей Сергеевич ",
          membergroup: "2370"
        },
        {
          k: 5,
          memberfio: "Гончарова Александра Дмитриевна ",
          membergroup: "2371"
        },
      ]
    }
  }
}
</script>

