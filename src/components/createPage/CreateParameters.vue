<template>
  <div class="QParameters">
    <div style = "color: white" class="SubHeader">Параметры Доступа: {{ choice }} </div>

    <select v-model="choice" class = "ParameterBox">
      <option class = "ParameterText" disabled value="">Выберите параметр: </option>
      <option>Параметр A</option>
      <option>Параметр B</option>
      <option>Параметр C</option>
      <option>Параметр D</option>
      <option>Параметр E</option>
    </select>
  </div>
</template>

<script>
  export default {
  name: 'QParameters',
  props: ['qparameters']
}
</script>
