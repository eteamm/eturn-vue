<template>
  <div class="mainButton">
    <button class="makeTurnBtn">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainButton',
  props: ['buttonText']
}
</script>

