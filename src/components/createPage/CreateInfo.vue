<template>
  <div class="QInfo">
    <p style="color: white" class="SubHeader"> {{header}}</p>
    <input text v-model = "model" class= "NameBox" placeholder = "   Введите Значение">

  </div>
</template>

<script>
  export default {
  name: 'QInfo',
  props: ['text', 'header', 'intext']
}
</script>
