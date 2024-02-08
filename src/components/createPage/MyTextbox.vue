<template>
  <div>
    <p style="color: white" class="SubHeader"> Enter Group Number: </p>
    <input class= "NameBox" type="text" :placeholder="placeholder" v-model="inputValue" @keydown.enter="$emit('enter')" />
  </div>
</template>

<script>
export default {
  props: {
    header: String,
    placeholder: String,
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>
