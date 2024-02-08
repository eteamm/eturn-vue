<template>
  <div class="QFrequency">
    <p style="color: white" class="SubHeader">Частота Вступления в Очередь: {{ name }}  </p>
    <input v-model="name" placeholder= "Частота" class="NameBox" />
  </div>
</template>

<script>
  export default {
  name: 'QFrequency',
  props: ['qfrequency']
}
</script>
