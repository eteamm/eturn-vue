<template>
  <div class="yourqueue">
    <span class="yourturn">ТВОЙ ЧЕРЕД</span>
  </div>
  <member-in-queue
    v-for="block in members"
    :key="block.memberfio"
    :queue_list="block"
  />
</template>

<script>
import MemberInQueue from "@/components/turnPage/turnPosition.vue";
export default {
  name: 'YourTurn',
  components: {
    MemberInQueue
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
