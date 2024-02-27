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
        <turn-list />
        <router-link to="/create">
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
import TurnList from "@/components/mainPage/turnList";
import TypeTurnFilterBtn from "@/components/mainPage/typeTurnFilterBtn.vue";
import {mapGetters, mapState} from "vuex";
export default {
  name: 'firstPage',
  components: {
    TypeTurnFilterBtn,
    AccessFilterBtn,
    TurnList,
    Header, UserInformation, MainButton, BlockOnMainPage
  },
  props:{

  },
  methods:{

  },
  computed: {
    ...mapState(['listTurn']),
    ...mapGetters(["getterTurnAccess", "getterTurnType"]),
  },

}
</script>

