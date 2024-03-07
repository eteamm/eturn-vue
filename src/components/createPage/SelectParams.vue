<template>
  <div class="optionParam">
    <div class="form-check">
      <input v-model="this.isChecked" class="form-check-input" type="checkbox">
      <label class="form-check-label" for="flexCheckDefault">
        {{valueForParam}}
      </label>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
  name: 'SelectParams',
  props: ['data', 'type'],
  data(){
    return{
      isChecked: this.$store.getters.getterCreateTurnParam({id: this.type, data: this.data}),
      paramId: this.data.id,
    }
  },
  mounted() {
    this.isChecked = this.$store.getters.getterCreateTurnParam({id: this.type, data: this.data})
  },
  computed:{
    ...mapGetters(['getterCreateTurnParam', 'getterParam']),
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
    },
    // checked: function (){
    //   let paramsForTurn = this.$store.getters.getterCreateTurnParam(this.type);
    //   if (paramsForTurn==null){
    //     this.isChecked = false
    //     return false
    //   }
    //   if (paramsForTurn.contains(this.data)){
    //     this.isChecked=true
    //     return true
    //   }
    // }
  },
  methods:{

  },
    watch:{
      isChecked(newChecked, oldChecked){
      if (newChecked){
        // console.log("data", this.data)
        this.$store.dispatch("setParam", {type: this.type, data: this.data})
      }
    }
  }
}
</script>
