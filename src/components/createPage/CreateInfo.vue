<template>
  <div class="QInfo">
    <input v-model="info" class= "NameBox" v-bind:placeholder="header" />
    <p v-if="error" class="errorInfo">Поле не может быть пустым</p>
  </div>
</template>

<script>
  export default {
  name: 'QInfo',
  props: ['header', 'type'],
  data(){
    return{
      error: false,
      info: ''
    }
  },
  methods:{
    checkError(thisError){
      this.error = thisError
    },
  },
  watch:{
    info(newInfo, oldInfo){
      if(newInfo===''){
        this.error = true
        this.$store.dispatch("saveTurnProperty", {nameP: this.type, valueP:null})
      }
      else{
        this.$store.dispatch("saveTurnProperty", {nameP: this.type, valueP:this.info})
        this.error = false
      }
    }
  }
}
</script>
