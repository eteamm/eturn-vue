<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle">{{getterName($store.state.turnId).name}}</span>
    <p class="TurnCreator">{{ getterName($store.state.turnId).teacher}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity">{{getterName($store.state.turnId).quantity}}</span>
      <p class="qpeople">человек</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {id} from "postcss-selector-parser";

export default {
  name: 'TurnInfo',
  methods: {id},
  props: ['turnTitle', 'turnCreator', 'q', 'id'],
  computed: mapGetters(['getterName'])
}
</script>
