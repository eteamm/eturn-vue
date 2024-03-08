<template>
  <div class="yourTurn">
    <span class="yourturn">ТВОЙ ЧЕРЕД</span>
  </div>
  <TurnPosition
    v-for="block in members"
    :key="block.memberfio"
    :Turn_list="block"
  />
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
export default {
  name: 'YourPosition',
  components: {
    TurnPosition
  },
  props: {},
  data() {
    return {
      members: [
        {
          k: '1',
          memberfio: "Кадун Никита Андреевич ",
          membergroup: "2391"
        },
      ]
    }
  }
}
</script>
