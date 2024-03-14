<template>
  <h3 class="mainHeader"><b>{{ header }}</b></h3>
  <div class="PositionBlockName">
    <MemberListElement userName="Железняк Александр Владимирович" type="members"/>
  </div>


</template>

<script>

import MemberListElement from "@/components/membersPage/memberListElement.vue";
export default {
  name: 'MemberListBlock',
  props: ['header', 'type'],
  components: {
    MemberListElement
  }
}
</script>




