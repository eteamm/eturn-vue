<template>
  <div class="optionParam">
    <div class="form-check">
      <input v-model="isChecked" class="form-check-input" type="checkbox">
      <label class="form-check-label" for="flexCheckDefault">
        {{this.value}}
      </label>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'SelectParams',
  props: ['id', 'value'],
  data(){
    return{
      isChecked: false
    }
  },
  methods:{

  },
  watch:{
    isChecked(newChecked, oldChecked){
      if (newChecked){
        alert(this.value)
      }
    }
  }
}
</script>
