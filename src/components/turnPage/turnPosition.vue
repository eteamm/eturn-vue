<template>
  <div class="memberinTurn">
    <span class ="membernumber">#{{Turn_list.k}} </span>
    <div class="aboutmember">
    <span class="fio">{{Turn_list.memberfio}}</span><br>
    <span class="memberqroup">{{Turn_list.membergroup}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberInTurn',
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
