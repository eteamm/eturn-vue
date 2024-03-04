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
    <div v-if="this.active[5]===true && this.active[4]===false ">
      <button v-on:click="openModalW" class="settingsParams">настроить параметры доступа</button>
    </div>
    <div v-if="this.openModal">
      <div class="background_modal"></div>
      <div class="modal_eturn">
        <div>
          <h1>hello!</h1>
          <button v-on:click="closeModalW">Закрыть</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
  name: 'QParameters',
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
    }
  },
  methods:{
    changeActive(type){
      this.active[5]=true;
      this.active[0]=false;
      this.active[1]=false;
      this.active[2]=false;
      this.active[3]=false;
      this.active[4]=false;
      this.active[type]=true;
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
