<template>
  <div class="TurnInfo">
    <div class="Title">
    <span class="TurnTitle" v-if="$route.query.type === '0'">{{getterName($store.state.id).name}}</span>
      <span class="TurnTitle" v-else>{{ getterAvailableName($store.state.id).name}}</span>
    <p class="TurnCreator" v-if="$route.query.type === '0'">{{ getterName($store.state.id).teacher}}</p>
      <p class="TurnCreator" v-else>{{ getterAvailableName($store.state.id).teacher}}</p>
    </div>
    <div class="Quantity">
      <span class="memebersQuantity" v-if="$route.query.type === '0'">{{getterName($store.state.id).quantity}}</span>
      <span class="memebersQuantity" v-else>{{getterAvailableName($store.state.id).quantity}}</span>
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
  computed: mapGetters(['getterName', 'getterAvailableName'])
}
</script>
