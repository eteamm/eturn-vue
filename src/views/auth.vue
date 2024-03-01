<template>
  <div>
    <Header title-name="Вход" title-description="Введите данные для авторизации" />
    <input v-model="login" name="login" placeholder="Введите логин" class="NameBox">
    <input v-model="password" name="password" placeholder="Введите пароль" class="NameBox" type="password">
    <button class="classic_button" v-bind:disabled="isClicked" v-bind:class="{animation_auth: getLoading('auth_loading'), classic_button_add: isClicked}" v-on:click="authUser">войти</button>
    <p v-if="getCurrentError('auth_error')" class="errorInfoAuth">Логин или пароль введены неверно.</p>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import {mapGetters} from "vuex";
import router from "@/router";
export default {
  name: 'Auth',
  components: {
    Header
  },
  data() {
    return {
      isClicked: false
    }
  },
  computed:{
    ...mapGetters(['getterToken', 'getCurrentError', 'getLoading'])
  },
  mounted() {
    let token = this.$store.getters.getterToken
    if (token!=null){
      router.push("turn")
    }
  },
  methods:{
    authUser(){
      this.isClicked = true
      setTimeout(()=>{this.isClicked=false},2000)
      if (this.login.trim() != null && this.password.trim() != null){
        this.$store.dispatch("authUser", {login: this.login.trim().toLowerCase(), password: this.password.trim()});
        // console.log(er)
        // if (er!=null){
        //   this.error=true
        //   this.errorInfo = er
        // }
      }
    }
  }
}
</script>




