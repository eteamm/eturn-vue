
<template>
  <div class="ExtraInfo">
    <span>Подробнее: {{extrainfo}}</span>
  </div>
</template>

<script>
  export default {
  name: 'ExtraInfo',
  props: ['extrainfo']
}
</script>
