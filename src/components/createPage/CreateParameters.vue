<template>
  <div class="QParameters">
    <div class="SubHeader">параметры доступа</div>
    <div class="paramsBlock">
      <button v-on:click="changeActive(0)" class="listParams paramsOnStart" v-bind:class="{paramsActive: this.active[0]}">Группы</button>
      <button v-on:click="changeActive(1)" class="listParams paramsInMiddle" v-bind:class="{paramsActive: this.active[1]}">Факультеты</button>
      <button v-on:click="changeActive(2)" class="listParams paramsInMiddle" v-bind:class="{paramsActive: this.active[2]}">Курсы</button>
      <button v-on:click="changeActive(3)" class="listParams paramsInMiddle" v-bind:class="{paramsActive: this.active[3]}">Кафедры</button>
      <button v-on:click="changeActive(4)" class="listParams paramsInEnd" v-bind:class="{paramsActive: this.active[4]}">По ссылке</button>
    </div>
    <div class="invisible_action" v-bind:class="{visible_action: this.active[5]===true && this.active[4]===false }" >
<!--         v-if="this.active[5]===true && this.active[4]===false "-->
<!--    >-->
      <button v-bind:disabled="this.active[5]===false || this.active[4]===true" v-on:click="openModalW" class="settingsParams">настроить параметры доступа</button>
    </div>
    <div class="modalAll" v-bind:aria-disabled="this.openModal">
      <div class="background_modal" v-bind:class="{openModal: this.openModal, add_z_index: this.addZ}"></div>
      <div class="modal_eturn"  v-bind:class="{openModal: this.openModal, add_z_index: this.addZ}">
        <div class="inModal">
          <h1>Выбери параметры</h1>
          <h2>{{this.titleModal}}</h2>
          <div class="selectF" v-if="this.typeParam===0">
            <select v-model="selected" class="form-select">
              <option v-bind:value="0">Выбери факультет</option>
              <option v-for="option in this.$store.getters.getterParam(1)" v-bind:value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="paramsAria">
            <select-params v-for="param in this.$store.getters.getterParam(this.typeParam)" :data="param" :type="this.typeParam" />
          </div>
          <button v-on:click="closeModalW" class="doneParamsBtn">Готово</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import SelectParams from "@/components/createPage/SelectParams";
  import {mapGetters} from "vuex";

  export default {
  name: 'QParameters',
  components:{
    SelectParams
  },
  data(){
    return{
      active:{
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      openModal:false,
      titleModal: "",
      thisToken: this.$store.getters.getterToken,
      typeParam: 0,
      addZ: true,
      selected: 0,
      options: this.$store.getters.getterParam(1),
    }
  },
  watch:{
    openModal(newOpen, oldOpen){
      if(newOpen===false){
        setTimeout(()=>{this.addZ=true}, 1000)
      }
      if(newOpen===true){
        this.addZ = false
      }
    },
    selected(newS, oldS){
      if (newS!==0){
        this.$store.dispatch('loadGroups', {token: this.$store.getters.getterToken, facultyId: newS})
      }
    }
  },
  computed:{
    ...mapGetters(['getterParam', 'getterToken','getterCreateTurnParam'])
  },
  methods:{
    changeActive(type){
      let names=['Группы','факультеты','Курсы','Кафедры']
      this.titleModal=names[type]
      this.active[5]=true
      this.typeParam = type
      if (!this.active[type]){
        if(type===1){
          this.$store.dispatch('loadFaculties', {token: this.$store.getters.getterToken})
        }
        if(type===2){
          this.$store.dispatch('loadCourses', {token: this.$store.getters.getterToken})
        }
        if(type===0){
          this.$store.dispatch('loadFaculties', {token: this.$store.getters.getterToken})
        }
      }

      this.active[0]=false;
      this.active[1]=false;
      this.active[2]=false;
      this.active[3]=false;
      this.active[4]=false;
      this.active[type]=true;

    // setTimeout(()=>{
    //   const scrollTarget = document.getElementById('endPage');
    //
    //   // const topOffset = document.querySelector('.scrollto').offsetHeight;
    //   const topOffset = 0; // если не нужен отступ сверху
    //   const elementPosition = scrollTarget.getBoundingClientRect().top;
    //   const offsetPosition = elementPosition - topOffset;
    //
    //   window.scrollBy({
    //     top: offsetPosition,
    //     behavior: 'smooth'
    //   });
    // },1000)
    // setTimeout(()=>window.scrollTo(0, document.body.scrollHeight),1000)
    // window.scrollTo(0, document.body.scrollHeight);
    },
    openModalW(){
      this.openModal=true;
    },
    closeModalW(){
      this.openModal=false;
    }
  }
}
</script>
