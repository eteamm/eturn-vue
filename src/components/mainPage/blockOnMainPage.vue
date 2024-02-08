<template>
  <router-link style="text-decoration: none" :to="{name: 'turn', params: {id: queue_data.id}, query: {type: 0}}" @click="$store.commit('changeId', queue_data.id)">
    <div class="queueBlock1">
      <div class="nameQueue">
        {{queue_data.name}}
      </div>
      <div class="nameTeacher">
        {{ queue_data.teacher }}
      </div>
      <div class="quantityPeople">
        {{queue_data.quantity}} человек
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'BlockOnMainPage',
  props: {
    queue_data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

