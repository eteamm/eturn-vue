<template>
  <div class="queueInfo">
    <div class="Title">
    <span class="QueueTitle" v-if="$route.query.type === '0'">{{getterName($store.state.id).name}}</span>
      <span class="QueueTitle" v-else>{{ getterAvailableName($store.state.id).name}}</span>
    <p class="QueueCreator" v-if="$route.query.type === '0'">{{ getterName($store.state.id).teacher}}</p>
      <p class="QueueCreator" v-else>{{ getterAvailableName($store.state.id).teacher}}</p>
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
  name: 'QueueInfo',
  methods: {id},
  props: ['turnTitle', 'turnCreator', 'q', 'id'],
  computed: mapGetters(['getterName', 'getterAvailableName'])
}
</script>
