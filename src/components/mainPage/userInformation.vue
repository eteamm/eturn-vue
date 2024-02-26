<template>
  <div class="informationAboutStudent">
    <div class="name">
      <p class="sectionNameUser">имя пользователя</p>
      <p class="nameTitle"><b>{{ users.name }}</b></p>
    </div>
    <div class="additionalInformation">
      <div class="status">
        <p class="sectionName">статус</p>
        <p class="statusAndGroup">{{ users.role }}</p>
      </div>
      <div class="group">
        <p class="sectionName">группа</p>
        <p class="statusAndGroup">{{ users.group }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'userInformation',
  props: ['userName', 'userStatus', 'userGroup'],
  mounted () {
    this.$store.dispatch('loadUsers', 1)
  },
  computed: mapState(['users'])
}
</script>
