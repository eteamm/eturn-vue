// TODO УДАЛИТЬ ЭТОТ КОМПОНЕНТ

<template>
  <turn-list-element
    v-for="block in $store.state.listTurn"
    :Turn_data="block"

  />
</template>

<script>
import TurnListElement from "@/components/mainPage/turnListElement.vue";
import {mapState} from "vuex";
import {mapGetters} from "vuex";
export default {
  name: "listMy",
  components: {
    TurnListElement
  },
  props: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['listTurn']),
    ...mapGetters(['getterUserId']),
  },
  mounted() {
    this.$store.dispatch('loadListTurn', {id: this.$store.getters.getterUserId, type: 'edu', access: 'participates'})
  },
}
</script>
