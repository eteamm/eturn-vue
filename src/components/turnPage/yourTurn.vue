<template>
  <div class="yourTurn">
    <span class="yourturn">ТВОЙ ЧЕРЕД</span>
  </div>
  <member-in-Turn
    v-for="block in members"
    :key="block.memberfio"
    :Turn_list="block"
  />
</template>

<script>
import MemberInTurn from "@/components/turnPage/turnPosition.vue";
export default {
  name: 'YourTurn',
  components: {
    MemberInTurn
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
