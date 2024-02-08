<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <Header title-name="Главная" title-description="список очередей"/>
        <div class="etuIdInformation">
          <button class="exitBtn">выйти</button>
        </div>
        <UserInformation user-group="..." user-name="..." user-status="..."/>
        <my-and-available />
        <router-link to="/create" :to="{query: {nameQueue: 'ТОЭ'}}">
          <main-button button-text="СОЗДАТЬ ОЧЕРЕДЬ" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import UserInformation from "@/components/mainPage/userInformation.vue";
import MyAndAvailable from "@/components/mainPage/myAndAvailable.vue";
import MainButton from "@/components/mainButton.vue";
import BlockOnMainPage from "@/components/mainPage/blockOnMainPage.vue";
import ListMy from "@/components/mainPage/listMy.vue";
export default {
  name: 'firstPage',
  components: {
    ListMy,
    Header, UserInformation, MyAndAvailable, MainButton, BlockOnMainPage
  }
}
</script>

