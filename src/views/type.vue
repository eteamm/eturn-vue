<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div>
          <h1 class="typeHeader">Выбери тип очереди</h1>
          <div class="typeBlock" v-on:click="type('EDU')">
            <p class="typeName">УЧЕБНАЯ</p>
            <p class="typeDesc">создается для ограниченного числа студентов</p>
          </div>
          <div class="typeBlock" v-if="getterRoleUser==='Сотрудник'" v-on:click="type('ORG')">
            <p class="typeName">ОРГАНИЗАЦОННАЯ</p>
            <p class="typeDesc">создается для неограниченного количества лиц</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import {mapGetters} from "vuex";
import router from "@/router";
export default {
  name: 'Type',
  computed:{
    ...mapGetters['getterRoleUser']
  },
  methods:{
    type(t){
      this.$store.dispatch("saveTurnProperty", {nameP:"turnType", valueP: t})
      router.push("/create")
    }
  }
}
</script>




