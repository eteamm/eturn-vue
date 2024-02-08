<template>
  <div class="typeQueue">
    <div class="myQueue" @click="visitable = true">
      <b>МОИ</b>
    </div>
    <div class="available" @click="visitable = false">
      <b>ДОСТУПНЫЕ</b>
    </div>
  </div>
  <list-my v-if="visitable" />
  <list-available v-else />
</template>

<script>
import ListMy from "@/components/mainPage/listMy.vue";
import ListAvailable from "@/components/mainPage/listAvailable.vue";

export default {
  name: 'MyAndAvailable',
  components: {ListAvailable, ListMy},
  data() {
    return {
      visitable: true
    }
  }
}
</script>
