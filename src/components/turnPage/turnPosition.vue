<template>
  <div class="memberinTurn">
    <span class ="memberNumb">#{{Turn_list.number}} </span>
    <div class="aboutmember">
    <span class="fio">{{Turn_list.memberfio}}</span><br>
    <span class="memberqroup">{{Turn_list.membergroup}}</span>
    </div>
    <CrossImg/>
  </div>
</template>

<script>
import CrossImg from "@/components/turnPage/crossImg.vue";

export default {
  // TODO rename turn_List to position
  // TODO Turn_list.userId == this.$store.userId -> v-if -> крестик
  // TODO image -> @click => deletePositionById(turn_list.id)
  name: 'TurnPosition',
  components: {CrossImg},
  props: {

    Turn_list: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
