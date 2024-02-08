<template>
  <div class="memberinqueue">
    <span class ="membernumber">#{{queue_list.k}} </span>
    <div class="aboutmember">
    <span class="fio">{{queue_list.memberfio}}</span><br>
    <span class="memberqroup">{{queue_list.membergroup}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberInQueue',
  props: {
    queue_list: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
