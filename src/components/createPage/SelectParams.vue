<template>
  <div class="optionParam">
    <div class="form-check">
      <input v-model="isChecked" class="form-check-input" type="checkbox">
      <label class="form-check-label" for="flexCheckDefault">
        {{valueForParam}}
      </label>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'SelectParams',
  props: ['data', 'type'],
  data(){
    return{
      isChecked: false,
      paramId: this.data.id,
    }
  },
  computed:{
    valueForParam: function (){
      if (this.type===1){
        return this.data.name;
      }
      else if(this.type===2){
        if (this.data.eduEnum==="BACCALAUREATE"){
          return this.data.number + " курс бакалавриата"
        }
      }
      else if(this.type===0){
        return this.data.name;
      }
    }
  },
  methods:{

  },
  watch:{
    isChecked(newChecked, oldChecked){
      if (newChecked){
        // alert(this.value)
      }
    }
  }
}
</script>
