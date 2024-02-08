<template>
  <div class="QDescription">
    <p class="SubHeader">Описание Очереди: {{ name }} </p>
    <input v-model="name" placeholder= "Описание Очереди" class="NameBox" />
  </div>
</template>

<script>
  export default {
  name: 'QDescription',
  props: ['qdescription']
}
</script>
