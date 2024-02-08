<template>
  <div class="mainButton">
    <button class="makeQueueBtn">
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

