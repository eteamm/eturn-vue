<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="errorInfo">
          <h1>Ошибка 404</h1>
          <p>Страница не найдена</p>
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
  name: 'Error',
}
</script>




