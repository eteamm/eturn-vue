import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from "vuex";
import app from "@/App.vue";
import queue from "@/views/turn.vue";
import {getUser} from "@/api/users";
import axios from 'axios'

const store = createStore({
  state () {
    return {
      queue: [
        {
          id: 0,
          name: "Сдача ТОЭ",
          teacher: "Купова Анастасия Викторовна",
          quantity: 153
        },
        {
          id: 1,
          name: "Матан",
          teacher: "Железняк Александр Владимирович",
          quantity: 534
        },
        {
          id: 2,
          name: "Помощь по ТОЭ",
          teacher: "Кадун Никита Андреевич",
          quantity: 11
        },
        {
          id: 3,
          name: "Eturn",
          teacher: "Васильев Андрей Антонович",
          quantity: 8
        },
        {
          id: 4,
          name: "Деканат",
          teacher: "Холод Иван Иванович",
          quantity: 57
        },
        {
          id: 1,
          name: "Столовая",
          teacher: "Сгущёнкина Марфа Викентьевна",
          quantity: 215
        },
        {
          id: 5,
          name: "Очередь в очередь",
          teacher: "Жырдылбеков Пантелей Микулович",
          quantity: 897
        },
        {
          id: 6,
          name: "Сомнительно, но ОКЭЙ",
          teacher: "Тиньков Олег Юрьевич",
          quantity: 1
        },
        {
          id: 7,
          name: "Активирование угля",
          teacher: "Щинигачжоу Хый Идинахый",
          quantity: 78
        },
        {
          id: 8,
          name: "Промышленное производство бульона пельменей",
          teacher: "Евстипатанова Гюльбайнека Жежвистовна",
          quantity: 1245
        },
      ],
      queue1: [
        {
          id: 0,
          name: "Сдача ООП",
          teacher: "Хрен её знает",
          more: "Не приходить"
        },
        {
          id: 1,
          name: "Жопа",
          teacher: "Самоваров Иван",
          more: "Что за хрень я пишу?"
        }
      ],
      id: 0,
      users: []
    }
  },
  mutations: {
    changeId(state, n) {
      state.id = n
    },
    SAVE_USERS(state, users) {
      state.users = users;
    }
  },
  getters: {
    getterName: (state) => (id) => {
      return state.queue.find(queue => queue.id === id)
    },
    getterAvailableName: (state) => (id)=> {
      return state.queue1.find(queue1 => queue1.id === id)
    }
  },
  actions: {
    loadUsers({commit}, id) {
      axios.get('/user/'+ id).then(result => {
        commit('SAVE_USERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    }
  }
})
createApp(App).use(router).use(store).mount('#app')

