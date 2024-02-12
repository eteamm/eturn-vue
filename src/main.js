import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from "vuex";
import app from "@/App.vue";
import Turn from "@/views/turn.vue";
import {getUser} from "@/api/users";
import axios from 'axios'
import { createMetaManager } from 'vue-meta'

const store = createStore({
  state () {
    return {
      myTurn: [
        // {
        //   id: 0,
        //   name: "Сдача ТОЭ",
        //   teacher: "Купова Анастасия Викторовна",
        //   quantity: 153
        // }
      ],
      availableTurn: [
        // {
        //   id: 0,
        //   name: "Сдача ООП",
        //   teacher: "Хрен её знает",
        //   more: "Не приходить"
        // }
      ],
      turnId: 0,
      userId: 1,
      users: [],
      positionsCurrentTurn: [
        {
          "id": 1,
          "name": "Васильев Андрей Антонович",
          "group": "2391",
          "start": false,
          "number": 1,
          "userId": 1
        }
      ]
    }
  },
  mutations: {
    changeCurrentTurnId(state, n) {
      state.turnId = n
    },
    SAVE_USERS(state, users) {
      state.users = users;
    },
    SAVE_AVAILABLE_TURN(state, turn) {
      state.availableTurn = turn;
    },
    SAVE_MY_TURN(state, turn) {
      state.myTurn = turn;
    }
  },
  getters: {
    getterUserId: (state) => {
      return state.userId;
    },
    getterName: (state) => (id) => {
      return state.myTurn.find(Turn => Turn.id === id)
    },
    getterAvailableName: (state) => (id)=> {
      return state.availableTurn.find(queue1 => queue1.id === id)
    },
  },
  actions: {
    loadUsers({commit}, id) {
      axios.get('/user/'+ id).then(result => {
        commit('SAVE_USERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    loadMyTurn({commit}, {id, type, access}) {
      axios.get('/turn?userId=' + id + '&type=' + type + '&access=' + access).then(result => {
        commit('SAVE_MY_TURN', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    loadAvailableTurn({commit}, {id, type, access}) {
      axios.get('/turn?userId=' + id + '&type=' + type + '&access=' + access).then(result => {
        commit('SAVE_AVAILABLE_TURN', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    //loadPositions({commit}, {idTurn}){
    // TODO Для Риты: запрос авторизации
    // TODO сделать запрос для вывода позиций
    // TODO сделать запрос для удаления позиций
    // TODO сделать запрос для вывода текущей первой позиции
    //}
  }
})
const app1 = createApp(App).use(router).use(store).use(createMetaManager())

await router.isReady()
app1.mount('#app')

