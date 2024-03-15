<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle">{{getCurrentTurn!=null ? getCurrentTurn.name : null}}</span>
    <p class="TurnCreator">{{getCurrentTurn!=null ? getCurrentTurn.creator : null}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getCurrentTurn!=null ? getCurrentTurn.countUsers : null}}</span>
      <p class="qpeople">человек</p>
    </div>
  </div>
  <div class="ExtraInfo">
    <span>Подробнее: {{getCurrentTurn!=null ? getCurrentTurn.description : null}}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {id} from "postcss-selector-parser";

export default {
  name: 'TurnInfo',
  computed: mapGetters(['getCurrentTurn', 'getterToken', 'getCurrentTurnId']),
  mounted() {
    let name = "turnType"
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    let info = matches ? decodeURIComponent(matches[1]) : undefined;
    if (info !== undefined){
      console.log(info)
      this.$store.dispatch('changeTurnId', info);
      this.$store.dispatch("loadCurrentTurn",{id: info, token: this.$store.getters.getterToken})
    }


  }
}
</script>
