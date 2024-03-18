<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="errorInfo">
          <h1>Ошибка 403</h1>
          <p>У вас нет доступа к этому ресурсу</p>
          <router-link to="/">
            <div class="errorBtn"><button>Вернуться на главную страницу</button></div>

          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import {mapGetters} from "vuex";
import router from "@/router";
export default {
  name: 'Error 403',
}
</script>




