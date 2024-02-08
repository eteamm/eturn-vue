<template>
  <div class="ElementHeader">
    <p class="Hdescription">{{ elementDescription }}</p>
  </div>
</template>

<script>
export default {
  name: 'ElementHeader',
  props: ['elementDescription']
}
</script>
