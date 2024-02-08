<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="logoImg">
          <img src="../assets/logo.png">
        </div>
        <div class="mainInfoTxt">
          <h1 class="startTitle">
            Всего три простых шага!
          </h1>
        </div>
        <div class="listTxt">
          <ol>
            <li class="mainText">Авторизируйся через <b>ETU ID</b></li>
            <li class="mainText">Выбери или создай список</li>
            <li class="mainText">Жди своей очереди!</li>
          </ol>
        </div>
        <div class="mainButton">
          <router-link to="/">
            <main-button button-text="вперёд" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import MainButton from "@/components/mainButton.vue";

export default {
  name: 'firstPage',
  components: {
    MainButton,
    Header
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/main";
</style>
