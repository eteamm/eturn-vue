<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <Header title-name="Главная" title-description="список очередей"/>
        <div class="etuIdInformation">
          <img src="../assets/img/exitbtn.svg"  alt="exit">
        </div>
        <user-information user-group="..." user-name="..." user-status="..."/>
        <type-turn-filter-btn />
        <access-filter-btn />
        <router-link to="/create" :to="{query: {nameTurn: 'ТОЭ'}}">
          <main-button button-text="создать очередь" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import UserInformation from "@/components/mainPage/userInformation.vue";
import AccessFilterBtn from "@/components/mainPage/accessFilterBtn.vue";
import MainButton from "@/components/mainButton.vue";
import BlockOnMainPage from "@/components/mainPage/turnListElement.vue";
import ListMy from "@/components/mainPage/listMy.vue";
import TypeTurnFilterBtn from "@/components/mainPage/TypeTurnFilterBtn.vue";
export default {
  name: 'firstPage',

  components: {
    TypeTurnFilterBtn,
    AccessFilterBtn,
    ListMy,
    Header, UserInformation, MainButton, BlockOnMainPage
  }
}
</script>

