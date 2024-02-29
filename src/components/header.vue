<template>
  <div class="header">
    <p class="headerName"><b>{{ titleName }}</b></p>
    <p class="headerSecondName">{{ titleDescription }}</p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['titleName', 'titleDescription']
}
</script>


